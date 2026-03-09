const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/capture', leadController.createLead);
router.get('/all', leadController.getAllLeads);
router.patch('/update/:id', leadController.updateLeadStatus);
router.get('/stats', leadController.getDashboardStats);
router.get('/reminders', leadController.getReminders);
router.post('/schedule-visit', leadController.scheduleVisit);

module.exports = router;