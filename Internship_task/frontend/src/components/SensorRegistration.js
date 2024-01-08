import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import "../styles/SensorRegistration.css";

const SensorRegistration = () => {
  const [sensorName, setSensorName] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/sensors/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sensorName }),
        }
      );

      if (response.ok) {
        console.log(`Sensor Registered: ${sensorName}`);
        alert(`Sensor ${sensorName} registered successfully!`);
        // Redirect to the landing page (replace "/landing" with your actual landing page URL)
        window.location.href = "/landing";
      } else {
        console.error("Error registering sensor:", response.statusText);
        alert("Error registering sensor. Please try again.");
      }
    } catch (error) {
      console.error("Error registering sensor:", error.message);
      alert("Error registering sensor. Please try again.");
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5">Register a New Sensor</Typography>
        <TextField
          label="Sensor Name"
          variant="outlined"
          fullWidth
          value={sensorName}
          onChange={(e) => setSensorName(e.target.value)}
          style={{ margin: "10px 0" }}
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register Sensor
        </Button>
      </Paper>
    </Container>
  );
};

export default SensorRegistration;
