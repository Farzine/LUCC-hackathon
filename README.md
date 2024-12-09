# LUCC Hackathon

Welcome to the **LUCC Hackathon** project! This repository contains a full-stack web application built with **Next.js** (for the client-side) and **Node.js** (for the server-side). The project is designed to demonstrate the integration of a modern frontend with a backend API.

## Project Structure


### 1. `/client` - Next.js Frontend

This folder contains the Next.js application that handles the UI and user interactions. It communicates with the Node.js backend for data fetching and dynamic content rendering.

### 2. `/server` - Node.js Backend

This folder contains the Node.js backend, which provides the API endpoints. The server handles requests from the frontend and processes data accordingly.

## Getting Started

Follow the steps below to set up the project locally on your machine.

### Prerequisites

- **Node.js** and **npm** (or **Yarn**) installed on your machine.  
  If you don't have these installed, download and install Node.js from [here](https://nodejs.org/).

### Step 1: Clone the Repository

Clone the project repository to your local machine using the following command:

```bash
git clone https://github.com/Farzine/LUCC-hackathon.git
cd LUCC-hackathon
```
### Step 2: Set Up the Client
Navigate to the client directory:
```bash
cd client
npm install
npm run dev
```

### Step 3: Set Up the Server
Navigate to the server directory:

```bash
cd ../server
npm install
npm start
```

### `.env`- Environment variables
unmount the .sql file in `server/database/database.sql` for the database and pass your other variables here:
```bash
CLOUDINARY_CLOUD_NAME= 
CLOUDINARY_API_KEY= 
CLOUDINARY_API_SECRET=
JWT_SECRET= 
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
```

## Second Repo
```flask repo link- https://github.com/Ismail-Hossain-1/Meeting-Schedular```
