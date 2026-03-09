const Lead = require('../models/Lead');
const Agent = require('../models/Agent');

exports.createLead = async (req, res) => {
    try {
        const { name, phone, source } = req.body;


        const agent = await Agent.findOne({ isAvailable: true }).sort({ currentLoad: 1 });

        if (!agent) {
            return res.status(500).json({ message: "No agents available for assignment" });
        }

        const newLead = new Lead({
            name,
            phone,
            source,
            agentId: agent._id,
            status: 'New Lead',
            timeline: [{ stage: 'New Lead', note: 'Lead automatically captured and assigned' }]
        });

        await newLead.save();

        agent.currentLoad += 1;
        await agent.save();

        res.status(201).json({ message: "Lead captured and assigned successfully", lead: newLead });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) return res.status(404).json({ message: "Lead not found" });

        lead.status = status;
        lead.timeline.push({ stage: status, timestamp: new Date() });
        
        await lead.save();
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllLeads = async (req, res) => {
    try {
  
        const leads = await Lead.find().populate('agentId', 'name').sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await Lead.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const totalLeads = await Lead.countDocuments();
        
        res.status(200).json({
            totalLeads,
            breakdown: stats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getReminders = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const overdueLeads = await Lead.find({
            status: 'New Lead',
            createdAt: { $lt: twentyFourHoursAgo }
        }).populate('agentId', 'name');

        res.status(200).json(overdueLeads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const Visit = require('../models/Visit');

// SCHEDULE A VISIT (Requirement #4)
exports.scheduleVisit = async (req, res) => {
    try {
        const { leadId, propertyAddress, visitDate } = req.body;

        const newVisit = new Visit({ leadId, propertyAddress, visitDate });
        await newVisit.save();

        // Automatically update lead status to "Visit Scheduled"
        await Lead.findByIdAndUpdate(leadId, { 
            status: 'Visit Scheduled',
            $push: { timeline: { stage: 'Visit Scheduled', note: `Visit at ${propertyAddress}` } }
        });

        res.status(201).json({ message: "Visit scheduled and lead status updated", visit: newVisit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};