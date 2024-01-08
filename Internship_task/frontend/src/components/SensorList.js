import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Button, Input } from "@material-ui/core";
import SensorConfigModal from "./SensorConfigModal";
import "../styles/SensorList.css";
import Papa from "papaparse";

const SensorList = () => {
  const [sensorList, setSensorList] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileInput, setFileInput] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/sensors");
        const data = await response.json();
        setSensorList(data);
      } catch (error) {
        console.error("Error fetching sensors:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event, sensorName) => {
    console.log("File change - Sensor Name:", sensorName);
    setFileInput(event.target.files[0]);
    handleUpload(sensorName);
  };

  const handleUpload = async (sensorName) => {
    console.log("Upload - Sensor Name:", sensorName);
    if (!fileInput) {
      console.error("No file selected!");
      return;
    }

    try {
      const fileContent = await fileInput.text();
      const { data: parsedData } = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        delimiter: "\t",
      });

      const response = await fetch(
        `http://localhost:8000/api/data/${sensorName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            parsedData.map(({ Timestamp, data }) => ({
              timestamp: Timestamp,
              value: data,
            }))
          ),
        }
      );

      if (response.ok) {
        console.log("Data uploaded successfully!");
        const updatedResponse = await fetch(
          "http://localhost:8000/api/sensors"
        );
        const updatedData = await updatedResponse.json();
        setSensorList(updatedData);
      } else {
        console.error("Error uploading data:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading data:", error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/data/:sensorName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sensorList),
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully!");
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Container className="container">
      <Paper elevation={3} className="paper">
        <Typography variant="h5" className="title">
          Sensor List
        </Typography>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sensorList.map((sensor, index) => (
                <tr key={sensor.sno} className="sensor-list-item">
                  <td>{index + 1}</td>
                  <td>{sensor.sensorName}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setSelectedSensor(sensor.sensorName)}
                    >
                      Upload
                    </Button>
                    {selectedSensor === sensor.sensorName && (
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(event) =>
                          handleFileChange(event, sensor.sensorName)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>

      <SensorConfigModal
        sensorId={selectedSensor}
        sensorName={selectedSensor ? `Sensor ${selectedSensor}` : ""}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default SensorList;
