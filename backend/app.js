const express = require("express");
const cors = require('cors');
// const fs = require('fs')
const jsonRouter = require('./routes/jsonRoute')
const DataBase = require("./connectToDb");
// const JsonData = require("./models/dataSchema");

const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });
const app = express();
app.use(cors());

// const data = JSON.parse(fs.readFileSync('./data/jsondata.json', 'utf-8'))

// const importData = async () => {
//   try {
//     await JsonData.create(data)
//     console.log('data successfully imported')
//     // to exit the process
//     process.exit()
//   } catch (error) {
//     console.log('error', error)
//   }
// }
// importData();
// // console.log(data)

app.use("/api/data" , jsonRouter);

DataBase();

module.exports = app;
