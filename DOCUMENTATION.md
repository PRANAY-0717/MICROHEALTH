# MicroHealth Project Documentation

This document provides a formal and detailed explanation of the **MicroHealth** project. It is designed to help you understand the codebase line-by-line and prepare for interviews or future development.

## 1. Project Overview

**MicroHealth** is a health monitoring system for microservices. It demonstrates how a central server can track the "liveness" or "health" of various independent services (like a Payment Service or Checkout Service) using a "Heartbeat" mechanism.

### Key Concepts:
- **Heartbeat**: A periodic signal (HTTP request) sent by a service to the central server to indicate "I am alive".
- **Central Server (Monitor)**: Receives heartbeats and stores the latest timestamp.
- **Dashboard (Frontend)**: Periodically checks the server to see if services have sent a heartbeat recently. If the last heartbeat was too long ago (e.g., > 60 seconds), the service is marked as "Down" (Red).

---

## 2. Architecture & Flow

1.  **Microservices** (`payment.js`, `checkout.js`) run independently.
2.  Every 30-35 seconds, they send a **GET request** to the server (e.g., `/paymentBeat`).
3.  The **Server** (`index.js`) receives this request and saves the **current timestamp** to `data.json`.
4.  The **Frontend** (`app.js`) asks the server every 10 seconds: "When was the last heartbeat for Payment?"
5.  If the timestamp is recent (< 60s), the UI shows **Green**. If old, it shows **Red**.

---

## 3. Detailed Code Analysis

### A. Backend Server (`index.js`)

This is the main brain of the application. It runs the web server and the API.

| Lines | Code Snippet | Explanation |
| :--- | :--- | :--- |
| **1-4** | `const express = ...` | **Imports**: We import `express` (web framework), `path` (file paths), and `fs` (file system) to read/write files. |
| **6-7** | `const data = require("./data.json");` | **Database Loading**: We load the current state of service heartbeats from `data.json` into a variable called `data`. Note: `require` loads JSON once at startup. |
| **9-11** | `app.set("view engine","ejs");` | **Setup**: Initializes Express and sets EJS as the template engine (though this project mainly uses static files, EJS is configured). |
| **17** | `app.use("/",express.static(...));` | **Static Files**: Tells the server to serve files from the `public` folder (like `index.htm`, `style.css`) when a user visits the root `/`. |
| **22-33** | `app.get("/:serviceName", ...)` | **Heartbeat API**: <br>1. **Dynamic Route**: `/:serviceName` captures anything sent (e.g., `paymentBeat`) into `req.params`.<br>2. **Update**: `data[serviceName] = Date.now()` updates the timestamp in memory.<br>3. **Persist**: `fs.writeFileSync(...)` saves the updated `data` object back to `data.json`. This ensures data isn't lost if the server restarts.<br>4. **Response**: Sends "YES" to acknowledge the heartbeat. |
| **36-40** | `app.get("/get/:serviceName", ...)` | **Status API**: Used by the frontend. It returns the last recorded timestamp (`data[serviceName]`) for the requested service. |
| **43-45** | `app.listen(3000, ...)` | **Start Server**: Begins listening on Port 3000. |

---

### B. Microservices (`MICROSERVICES/`)

These scripts simulate independent backend services.

#### 1. `checkout.js`
| Lines | Code Snippet | Explanation |
| :--- | :--- | :--- |
| **1-2** | `const axios = ...` | **Import**: Uses `axios`, a library for making HTTP requests (like fetching a URL). |
| **5** | `const url = ...` | **Target**: Defined to hit `http://localhost:3000/checkoutBeat`. |
| **8-19** | `async function sentBeat()` | **Logic**: <br>1. `await axios.get(url)`: Sends the signal to the main server.<br>2. Logs "Checkout Service alive" on success.<br>3. Catches and logs errors if the server is down. |
| **22** | `setInterval(..., 35000)` | **Loop**: Calls `sentBeat` every **35,000ms (35 seconds)**. This is the "Heartbeat". |

#### 2. `payment.js`
*   *Similar to Checkout, but runs on a **30-second** interval and hits `/paymentBeat`.*

---

### C. Frontend (`public/`)

The user interface that displays the health status.

#### 1. `index.htm`
*   **Structure**: Basic HTML page.
*   **Line 13-21**: Contains two main `divs`: `.service1` (Payment) and `.service2` (Checkout).
*   **Line 22**: Loads `app.js` which contains the logic.

#### 2. `app.js`
This file runs in the browser and updates the dashboard.

| Lines | Code Snippet | Explanation |
| :--- | :--- | :--- |
| **27-43** | `checkPayment()` | **Payment Checker**: <br>1. calls `axios.get("/get/paymentBeat")` to get the last timestamp.<br>2. **Logic**: `Math.abs(Date.now() - beat) < 60000`. <br>3. If the difference is **less than 60 seconds**, it means the service is **ALIVE**. Text becomes **Green**.<br>4. If **more than 60 seconds**, it means the service stopped sending heartbeats (Dead). Text becomes **Red**. |
| **45-61** | `checkCheckout()` | **Checkout Checker**: Same logic as above, but for the Checkout service. |
| **63-67** | `async function run()` | **Orchestrator**: Calls both check functions. |
| **69** | `setInterval(run, 10000)` | **Polling**: Runs the `run()` function every **10 seconds** to keep the UI updated. |

---

## 4. Summary for Interviews

**If asked "What does this project do?":**
> "It is a microservice health monitor. It consists of a central Express server and multiple independent services. The services send a heartbeat (HTTP Request) to the server every 30 seconds. The server logs the timestamp. A frontend dashboard polls the server; if a service hasn't checked in for over a minute, it flags the service as 'Down' (Red), otherwise it's 'Healthy' (Green)."

**If asked "How is data stored?":**
> "For this prototype, it uses a local JSON file (`data.json`) which is updated via the file system (`fs`) module every time a request comes in."

