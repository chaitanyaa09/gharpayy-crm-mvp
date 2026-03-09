Gharpayy Lead Management System (CRM) - MVP
📝 Project Overview
This is a Minimum Viable Product (MVP) built for Gharpayy, a platform helping students and professionals find PG accommodations in Bangalore. The system centralizes lead capture, automates assignment, and tracks the sales pipeline to eliminate manual operational issues.

🚀 Core Features
Lead Capture: Automated API endpoint to ingest leads from WhatsApp, Website forms, and Social Media.

Round Robin Assignment: Every new lead is automatically assigned to an available agent based on current workload balancing.

Lead Pipeline: A 8-stage tracking system (New Lead -> Contacted -> Visit Scheduled -> Booked, etc.).

Visit Scheduling: Integrated scheduling feature allowing agents to set property addresses and visit timestamps.

Dashboard Analytics: Real-time visibility into total leads received and pipeline stage distribution.

Inactivity Reminders: Logic to flag leads that have been inactive for over 24 hours.

🛠️ Tech Stack & Tools
Frontend: React.js (built with Tailwind CSS for rapid, responsive UI development).

Backend: Node.js & Express.js (handling asynchronous lead ingestion and assignment logic).

Database: MongoDB Atlas (NoSQL for flexible lead metadata and horizontal scalability).

State Management: React Hooks (useEffect/useState) and Axios for API communication.

🏗️ System Architecture
The system follows a Modular Monolith architecture with a clear separation between the Client and Server.

Controllers: Handle the "Brain" of the app (Round Robin logic and Pipeline updates).

Models: Normalized schemas for Leads, Agents, and Visits.

Scalability: For production, the system would incorporate Redis for the assignment queue and WebSockets (Socket.io) for real-time agent notifications.

⚙️ Setup Instructions
Clone the repository: git clone https://github.com/chaitanyaa09/gharpayy-crm-mvp.git.

Backend Setup:

Navigate to /server and run npm install.

Create a .env file with your MONGO_URI.

Run node seed.js to populate agents.

Start server: node index.js.

Frontend Setup:

Navigate to /client and run npm install.

Start frontend: npm start.

📊 Database Design
The Lead model includes a timeline array to provide a historical audit of lead movement, solving the "leads marked seen but not answered" issue.

Next Steps for Production
WhatsApp Business API integration.

Agent performance leaderboard.

Automated reassignment if an agent fails to respond within 2 hours.
