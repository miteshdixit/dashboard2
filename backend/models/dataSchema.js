const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema({
  end_year: { type: String, default: '' },
  intensity: { type: Number },
  sector: { type: String },
  topic: { type: String },
  insight: { type: String },
  url: { type: String },
  region: { type: String },
  start_year: { type: String, default: '' },
  impact: { type: String, default: '' },
  added: { type: String },
  published: { type: String },
  country: { type: String },
  relevance: { type: Number },
  pestle: { type: String },
  source: { type: String },
  title: { type: String },
  likelihood: { type: Number }
},{ timestamps: true })

const JsonData = mongoose.model('jsonData', DataSchema)

module.exports = JsonData;