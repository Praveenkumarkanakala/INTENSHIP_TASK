
## IoT Platform

# Overview

This project implements an IoT platform that registers sensors, stores data from simulated hardware nodes, and provides endpoints for accessing the data. Additionally, it includes a hardware simulator to generate data from three types of sensors (AQ, SR-AQ, WM-WD) and a data visualization component to visualize trends and significant data.

#Install Instructions/Setup

1. **Clone the Repository:**

   git clone <repository-url>
   cd iot-platform
   
npm install

**Configure Environment Variables:**
Create a .env file and set the necessary environment variables, such as MongoDB connection details.

**Programming Languages/Tools Used**
Node.js for backend development
Express.js for API endpoints
MongoDB for database storage
mern for data visualization


**How to Run**

**Start the IoT Platform:**
npm start
**Run Hardware Simulator:**

node simulator.js

 **Start Data Visualization:**
 
 we will the data of senors which are registered
 
 **screenshots**
 
![WhatsApp Image 2024-01-08 at 09 16 20_5592f39c](https://github.com/Praveenkumarkanakala/INTENSHIP_TASK/assets/114328662/42f2f8ae-1e08-43bb-a53a-de42b730ebfe)
![WhatsApp Image 2024-01-08 at 09 17 08_899a3a4b](https://github.com/Praveenkumarkanakala/INTENSHIP_TASK/assets/114328662/e69c32e9-d1f7-48e7-960b-cbab174bc20d)
![WhatsApp Image 2024-01-08 at 09 16 44_95590f3b](https://github.com/Praveenkumarkanakala/INTENSHIP_TASK/assets/114328662/7174e93d-d7a0-4102-9ba2-d22e5d3b71f8)

**working**


it will store the data or name of senors and shows in the output when we add or remove the sensor it will change in database 
#mangodb data base is connected to store the data and this project had two specifications 
1.REGISTARTION OF SENSORS
2.UPLOADING THE FILES WHICH ARE REGISTRED WITH NAME
 by registartion we can add the iot devices and their details
 and we can upload the files used for the senors 




