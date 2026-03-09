const mongoose = require('mongoose');
const Agent = require('./models/Agent');
require('dotenv').config();

const seedAgents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for seeding...");

    // Clear existing agents to avoid duplicates during testing
    await Agent.deleteMany({});

    const agents = [
      { name: "Rahul Sharma", email: "rahul@gharpayy.com", currentLoad: 0 },
      { name: "Sneha Patil", email: "sneha@gharpayy.com", currentLoad: 0 },
      { name: "Amit Kulkarni", email: "amit@gharpayy.com", currentLoad: 0 }
    ];

    await Agent.insertMany(agents);
    console.log("3 Agents seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding agents:", error);
    process.exit(1);
  }
};

seedAgents();