// SensorConfigModal.js

import React from "react";
import { Modal, Paper, Typography, TextField, Button } from "@material-ui/core";
import "../styles/SensorConfigModal.css"; // Import the CSS file

const SensorConfigModal = ({ sensorId, sensorName, open, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission and sensor configuration data
    console.log("Form submitted for Sensor", sensorId);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={onClose} className="modal-container">
      <Paper className="modal-paper">
        <Typography variant="h5">Configure {sensorName}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Configuration Option 1"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Configuration Option 2"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {/* Add more form fields as needed */}
          <Button type="submit" variant="outlined" color="primary">
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default SensorConfigModal;
