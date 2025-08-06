// models/Interface.js

const mongoose = require('mongoose');

const InterfaceSchema = new mongoose.Schema({
  name: { type: String, required: true },                     // interface name
  integrationKey: { type: String, required: true, unique: true }, // unique integration key
  sourceSystem: { type: String, required: true },             // where data comes from
  targetSystem: { type: String, required: true },             // where data goes
  description: { type: String }                               // optional description
});

module.exports = mongoose.model('Interface', InterfaceSchema);
