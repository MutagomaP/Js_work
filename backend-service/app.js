require("dotenv").config();
const cors = require("cors")
const express = require("express");
const app = express();

// Connect to MongoDB
require("./config/mongodb_connect").connect();

// built-in middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// import & use userRoutes like /createUser , /getUsers , /editUser , /deleteUser 
const userRoutes = require("./routes/userRoutes");
app.use('/' ,  userRoutes);

module.exports = app;