const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  source: { 
    type: String, 
    required: true,
    enum: ['WhatsApp', 'Website', 'Social Media', 'Lead Form'] // Matches Gharpayy's sources
  },
  status: { 
    type: String, 
    enum: ['New Lead', 'Contacted', 'Requirement Collected', 'Property Suggested', 'Visit Scheduled', 'Visit Completed', 'Booked', 'Lost'],
    default: 'New Lead'
  },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }, // For Lead Ownership
  timeline: [{
    stage: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);