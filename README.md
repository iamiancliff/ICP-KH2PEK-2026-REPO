<<<<<<< HEAD
# Week 4 – Managed Database Integration (AWS RDS)

## Objective
The goal of this project was to demonstrate how a Node.js backend application can connect to a managed relational database using AWS RDS (PostgreSQL).

---

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- AWS RDS
- Ubuntu (WSL)
- Git & GitHub

---

## Architecture Overview
The application follows a simple client-server architecture:

1. A user sends an HTTP request from the browser
2. A Node.js Express API processes the request
3. The API queries a PostgreSQL database hosted on AWS RDS
4. The database returns data to the API
5. The API responds with JSON data

---

## Step-by-Step Implementation

### Step 1: Create AWS RDS PostgreSQL Instance
- Created a PostgreSQL database using AWS RDS
- Configured public access for learning purposes
- Allowed inbound traffic on port 5432 via security group
- Verified database status as **Available**

Screenshot: `screenshots/rds-postgres-instance.png`

---

### Step 2: Connect to RDS Using Terminal
- Connected to the RDS instance using `psql` from Ubuntu (WSL)
- Created a users table
- Inserted sample user records (name and email)

Screenshot: `screenshots/db-data.png`

---

### Step 3: Setup Node.js Project
- Initialized Node.js project using `npm init`
- Installed dependencies:
  - express
  - pg
  - dotenv
- Created `.env` file to store database credentials securely

---

### Step 4: Database Connection (`db.js`)
- Created a PostgreSQL connection pool using the `pg` library
- Exported a reusable query function for database access

---

### Step 5: Express API (`server.js`)
- Created an Express server
- Implemented `/users` endpoint to fetch records from PostgreSQL
- Handled errors gracefully
- Verified API response in browser

Screenshot: `screenshots/api-browser-response.png`

---

## Environment Variables
Database credentials are stored in a `.env` file and excluded from GitHub using `.gitignore`.

---

## Outcome
This project demonstrates:
- Practical use of AWS RDS
- Secure database connectivity
- Backend API development
- Real-world cloud and database integration

