# Job Posting Board - Frontend (Client)

This is the frontend of the Job Posting Board application, built with **React** . It allows recruiters to register, post jobs, and manage their listings. Candidates can  receive updates via email automation. The frontend interacts with the backend APIs and provides a user-friendly interface.

## Table of Contents
- [Introduction](#introduction)
- [Project Setup](#project-setup)
- [Running Locally](#running-locally)
- [Tech Stack](#tech-stack)


## Introduction

The Job Posting Board frontend is designed to allow users (recruiters) to interact seamlessly with the backend. Recruiters can log in via OTP (email or mobile) to post jobs. This part of the project handles the user interface (UI) and communicates with the backend API.

## Project Setup

Follow these steps to get the frontend (client) up and running on your local machine:

1. **Clone the Job Posting Board Repository**:
   First, clone the main repository that contains both frontend and backend code:
   ```bash
   git clone https://github.com/Govind-P/JobPost.git

2. **Navigate to the client Directory: **:
   Once you've cloned the repository, move to the client folder, where the frontend code resides:
   ```bash
   cd JobPost/client

3. **Install Dependencies:**:
   Run the following command to install all necessary dependencies:
   ```bash
   npm install
4. **Set Up Environment Variables:**:
   Create a .env file in the client directory and add any environment variables, such as:
   ```bash
   REACT_APP_BACKEND_URL=your_backend_url

## Run Locally:
1. **Start the Development Server: **:
   To start the React development server, run:
   ```bash
   npm start
1. **Access the Application:**:
   The frontend will be running on http://localhost:3000. Open this URL in your browser to view the application.

## Tech Stack
1. **React.js:** For building the user interface and handling routing.
2. **Tailwind CSS:** For styling the application.
3. **Fetch API:** For making HTTP requests to the backend.
4. **JWT :** For handling authentication tokens .
