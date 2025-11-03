// server.js

const express = require('express');
const app = express();

// --- Configuration from Environment Variables ---
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const ENV_COLOR = process.env.ENV_COLOR || 'Unknown';
// ------------------------------------------------

// Basic route to display application details
app.get('/', (req, res) => {
    // Generate the HTML response with inline styling for the color
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Blue/Green Deployment App</title>
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .container {
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .status-box {
                    padding: 20px;
                    margin-top: 20px;
                    border-radius: 5px;
                    color: white;
                    font-weight: bold;
                    font-size: 1.2em;
                    background-color: ${ENV_COLOR.toLowerCase() === 'blue' ? '#007bff' : ENV_COLOR.toLowerCase() === 'green' ? '#28a745' : '#6c757d'}; /* Use blue, green, or default gray */
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Node.js Blue/Green App</h1>
                <p>This is the application running on **Version ${APP_VERSION}**.</p>
                <div class="status-box">
                    Current Environment: ${ENV_COLOR}
                </div>
            </div>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});

// Health check endpoint (useful for load balancers)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Application Version: ${APP_VERSION}`);
    console.log(`Environment Color: ${ENV_COLOR}`);
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});