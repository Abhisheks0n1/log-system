Log Ingestion and Querying System
Overview
This is a full-stack app to save and view logs. The backend (Node.js/Express) stores logs in a JSON file and provides an API. The frontend (React) shows logs in a table with filters for searching.
Features

Save Logs: Add logs via POST /logs with fields: level, message, resourceId, timestamp, traceId, spanId, commit, and metadata.
View Logs: See logs in a table, sorted by newest first.
Filter Logs: Search by message, level, resourceId, or timestamp range.
UI: Simple table with color-coded rows (error: red, warn: yellow, info: blue, debug: grey).

Requirements

Node.js (v16 or higher)
npm
Windows (or any OS with a terminal)

Setup
Backend

Go to the backend folder:cd backend


Install dependencies:npm install


Start the backend:npm start


Runs on http://localhost:5000.



Frontend

Open a new terminal and go to the frontend folder:cd frontend
Install dependencies:npm install


Start the frontend:npm start
Opens http://localhost:3000 in your browser.



Note: Run backend and frontend in separate terminals to keep both running at the same time.
Usage
Adding Logs
Use the attached curl_commands.txt file with Postman to add logs. Example:
curl -X POST http://localhost:5000/logs -H "Content-Type: application/json" -d '{
  "level": "error",
  "message": "Database connection timeout",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T09:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": { "parentResourceId": "server-5678" }
}'


Expected: Log saves to backend/logs.json and appears in the UI after refresh.

Viewing and Filtering Logs

Open http://localhost:3000.
Use the filter bar to search:
Message: E.g., "database".
Level: Choose error, warn, info, or debug.
Resource ID: E.g., "server-1234".
Timestamp Range: E.g., Start: 2023-09-15T09:00, End: 2023-09-15T09:45.


Logs update as you type (slight delay).

Attached Postman Commands
The curl_commands.txt file includes curl commands for Postman to add logs.
log-system/
├── backend/
│   ├── controllers/
│   │   └── logController.js
│   ├── routes/
│   │   └── logs.js
│   ├── services/
│   │   └── logService.js
│   ├── app.js
│   ├── logs.json
│   └── package.json
│   ├── logs.js
│  
│  
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterBar.js
│   │   │   ├── LogTable.js
│   │   │   └── LogRow.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md

Notes
Backend checks log fields and timestamp format.
UI is clean and easy to use, with color-coded rows for log levels.
