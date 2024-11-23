const express = require("express");
const { SerialPort } = require("serialport");
const cors = require("cors");
app.use(cors());

const app = express();
const port = 3000;

const serialPort = new SerialPort({
  path: "COM3", // Replace with your Arduino's port
  baudRate: 9600,
});

let isOn = false; // Track the state of the lights

app.get("/toggle", (req, res) => {
  isOn = !isOn; // Toggle the state
  const command = isOn ? "TOGGLE_ON" : "TOGGLE_OFF";

  serialPort.write(command + "\n", (err) => {
    if (err) {
      console.error("Error writing to Arduino:", err);
      return res.status(500).send("Failed to send command to Arduino");
    }
    console.log(`Command ${command} sent to Arduino`);
    res.send(`Lights are now ${isOn ? "ON" : "OFF"}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
