# 🏥 MicroHealth Monitor

**MicroHealth** is a lightweight, real-time health monitoring system designed to track the availability of microservices. It demonstrates the fundamental concepts of distributed system monitoring using a "heartbeat" mechanism and a centralized dashboard.

## Features

- **Real-Time Monitoring**: Live dashboard updates every 10 seconds to show the current status of all services.
- **Heartbeat Mechanism**: Independent services send periodic signals to indicate liveness.
- **Fault Detection**: Automatically flags services as **"Down"** (Red) if a heartbeat is missed for >60 seconds.
- **Persistence**: Service states are saved to disk (`data.json`), ensuring monitoring continuity even if the monitor server restarts.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Utilities**: Axios (HTTP requests)
- **Data Storage**: JSON (File-based persistence)

## 📂 Architecture

The system consists of three main components:

1.  **Central Server (`index.js`)**: Acts as the "Monitor". It receives heartbeat requests from services and logs the latest timestamp.
2.  **Microservices (`MICROSERVICES/*.js`)**: Independent scripts (simulating Payment and Checkout services) that send periodic "I am alive" HTTP requests to the server.
3.  **Dashboard (`public/`)**: A client-side interface that polls the server to check if services are active and visualizes their health status in real-time.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  Clone the repository and navigate to the source code:
    ```bash
    git clone https://github.com/yourusername/microhealth.git
    cd microhealth/MICROHEALTH
    ```

2.  Install the required dependencies:
    ```bash
    npm init -y
    npm install express axios ejs
    ```

### Usage Guide

To see the system in action, you will need to run the monitor server and the services simultaneously.

#### 1. Start the Monitor Server
Open your terminal and run:
```bash
node index.js
```
*The server will start on `http://localhost:3000`.*

#### 2. Open the Dashboard
Visit `http://localhost:3000` in your web browser. You should see the service indicators. They will likely be **Red** initially since no services are running yet.

#### 3. Start the Microservices
Open **two new terminal windows** (inside the `MICROHEALTH` directory) and run the simulated services:

**Terminal 2 (Payment Service):**
```bash
node MICROSERVICES/payment.js
```

**Terminal 3 (Checkout Service):**
```bash
node MICROSERVICES/checkout.js
```

#### 4. Observe Results
Switch back to your browser dashboard. Within 30-40 seconds, as the heartbeats are received, the status indicators will turn **Green**, indicating the services are healthy.

## Future Improvements

-   **Alerting System**: Integrate Email or Slack notifications when a service goes down.
-   **History Graphs**: Visualizing uptime over time.
-   **Docker Support**: Containerizing services for easier deployment.

---

## Author

**Made by Pranay**

I built this project while learning **Express.js** and **EJS**, aiming to apply these new concepts to create something meaningful and practical.
