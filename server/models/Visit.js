const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  propertyAddress: { type: String, required: true },
  visitDate: { type: Date, required: true },
  outcome: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Cancelled', 'No-show'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);