const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  currentLoad: { type: Number, default: 0 }, 
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Agent', agentSchema);