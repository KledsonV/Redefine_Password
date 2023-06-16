// Dotenv
require("dotenv").config();

// Port
const port = process.env.PORT;

// Express
const express = require("express");
const app = express();

// Read Json
app.use(express.json());

// Cors
const cors = require("cors");
app.use(cors({ origin: `http://localhost:${port}` }));

// User Router / User Database
const User = require("./Models/User");
const user = require("./Routers/UserRouter");
app.use(user);

// Opening Server
app.listen(port, () => {
  try {
    console.log(`Server opening in port: ${port}`);
  } catch (error) {
    console.log(`Error in app.listen: ${error}`);
  }
});
