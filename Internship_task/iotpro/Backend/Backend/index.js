const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/iot", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected..");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Define a Mongoose schema for sensor data
const sensorDataSchema = new mongoose.Schema({
  sensorName: {
    type: String,
    required: true,
  },
  data: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        required: true,
      },
      // Add more fields as per your data structure
    },
  ],
});

// Create a Mongoose model
const SensorData = mongoose.model("SensorData", sensorDataSchema);

app.post("/api/sensors/register", async (req, res) => {
  const { sensorName } = req.body;
  // Check if the sensor already exists in the database
  const existingSensor = await SensorData.findOne({ sensorName });

  if (existingSensor) {
    return res
      .status(400)
      .json({ error: `Sensor ${sensorName} already exists` });
  }

  try {
    // Create a new sensor document and save it to the database
    await SensorData.create({ sensorName, data: [] });
    res.status(201).json({ message: `Sensor ${sensorName} registered` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/api/data", async (req, res) => {
//   const { sensorName, data } = req.body;

//   try {
//     const sensor = await SensorData.findOne({ sensorName });
//     if (!sensor) {
//       // If the sensor doesn't exist, create a new sensor document and save it to the database
//       await SensorData.create({ sensorName, data: [{ value: data }] });
//       return res
//         .status(201)
//         .send("Sensor created and data received and saved to MongoDB");
//     }

//     // If the sensor already exists, add the new data to its array and save the updated document
//     sensor.data.push({ value: data });
//     await sensor.save();
//     res.status(200).send("Data received and saved to MongoDB");
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.post("/api/data/humdity and temparature", async (req, res) => {
  const { sensorName } = req.params;
  console.log("Received sensorName:", sensorName);

  try {
    // Check if the sensor exists in the database
    const sensor = await SensorData.findOne({ sensorName });

    if (!sensor) {
      return res.status(404).json({ error: `Sensor ${sensorName} not found` });
    }

    // Add the received data to the sensor's array
    const { timestamp, value } = req.body; // Assuming the JSON file has timestamp and value properties
    sensor.data.push({ timestamp, value });
    await sensor.save();

    res.status(200).json({ message: `Data added to sensor ${sensorName}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/data/hmudity and temparature", async (req, res) => {
  const { sensorName } = req.params;
  console.log("Received sensorName:", sensorName); // Log the received sensorName

  try {
    const sensor = await SensorData.findOne({ sensorName });

    if (!sensor) {
      return res.status(404).json({ error: `Sensor ${sensorName} not found` });
    }

    res.status(200).json(sensor.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/sensors", async (req, res) => {
  try {
    const allSensors = await SensorData.find();
    res.status(200).json(allSensors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
