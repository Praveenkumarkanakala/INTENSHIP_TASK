// LandingPage.js

import React from "react";
import { Container, Paper, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <Container className="landing-container">
      <div className="landing-content">
        <Typography variant="h4" gutterBottom>
          Welcome to the IoT Platform
        </Typography>
        <Typography variant="subtitle1" paragraph>
          Explore the features and manage your sensors with ease.
        </Typography>

        <Grid container spacing={3} justify="center">
          {/* Register Sensors Box */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} className="landing-paper">
              <Typography variant="h5">Register Sensors</Typography>
              <Typography variant="body1">
                Register new sensors on the platform.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/sensor-registration"
                className="landing-button"
              >
                Register Sensors
              </Button>
            </Paper>
          </Grid>

          {/* Get All Sensors Box */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} className="landing-paper">
              <Typography variant="h5">Get All Sensors</Typography>
              <Typography variant="body1">
                Retrieve a list of all registered sensors.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/sensor-list"
                className="landing-button"
              >
                Get All Sensors
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default LandingPage;
