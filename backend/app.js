const express = require("express");
const cors = require('cors');
const fs = require('fs')
const jsonRouter = require('./routes/jsonRoute')
const DataBase = require("./connectToDb");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL
}));


app.use("/api/data" , jsonRouter);

DataBase();

module.exports = app;
