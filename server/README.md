# Job Posting Board - Backend (server)
This is the backend for the Job Posting Board application, built with **Node.js** and **Express**. It provides a RESTful API for handling job postings, recruiter authentication, and email/SMS notifications using **Nodemailer** and **Twilio**.

## Table of Contents
- [Introduction](#introduction)
- [Project Setup](#project-setup)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)


## Introduction

The Job Posting Board backend serves as the API layer for the frontend application, enabling features such as recruiter registration, job posting, and notification systems. It implements secure OTP authentication for both email and mobile using **Nodemailer** for email notifications and **Twilio** for SMS OTP verification.

## Project Setup

Follow these steps to get the backend up and running on your local machine:

1. **Clone the Job Posting Board Repository**:
   First, clone the main repository that contains both frontend and backend code:
   ```bash
   git clone https://github.com/Govind-P/JobPost.git
2. **Navigate to the backend Directory**: 
    Once you've cloned the repository, move to the backend folder:
    ```bash
    cd JobPost/server 
3. **Install Dependencies**: 
    Run the following command to install all necessary dependencies:
    ```bash
    npm install
4. **Set Up Environment Variables**: 
    Create a .env file in the backend directory and add the following environment variables:
    ```bash
    MONGO_URL=mongodb_url                  
    PORT=5000     #port_number                           
    TWILIO_SID=your_twilio_sid   
    TWILIO_TOKEN=your_twilio_token   
    TWILIO_SERVICESID=your_twilio_messageservice_id 
    MY_EMAIL=your_email_address     
    EMAIL_PASS=your_email_app_password     
    JWT_SECRET=your_jwt_secret             
    JWT_SECRET_LOGIN=your_login_jwt_token  
    FRONTEND_URL=frontend_url

## Running Locally
Once the setup is complete, you can run the backend on your local machine:

1. **Start the Development Server**:
    To start the Node.js server, run:
    ```bash
    npm run dev
2. **Access the API**: 
    The backend will be running on http://localhost:5000. You can test the API endpoints using tools like Postman.

## API Endpoints
    
1. POST /api/signup : Register a new recruiter .
2. POST /api/emailVerify: OTP verification via email
3. POST /api/mobileVerify: OTP verification via mobile
4. POST /api/loginEmail : Login via Email OTP
5. POST /api/loginOtpEmail : Login via Email OTP
4. POST /api/loginMobile : Login via Mobile OTP
5. POST /api/loginOtpMobile : Login via Mobile OTP
6. GET /api/proceedDashboard : Proceed to dashboard after signup
6. GET /api/userDetails : Get user details
8. POST /api/jobpost :Post job
6. GET /api/getjobs : Get posted job by recruiter
10. GET /api/logout : Logout


## Tech Stack
1. **Node.js**: JavaScript runtime for building the server.
2. **Express**: Web framework for building RESTful APIs.
3. **MongoDB**: Database for storing user data, job posts, and OTPs.
4. **Nodemailer**: For sending email notifications.
5. **Twilio**: For sending OTPs via SMS.
6. **JWT**: For handling authentication tokens.


 ## Key Features
1. **OTP Authentication**: Secure user registration and login via email and mobile OTP.
2. **Job Posting**: Recruiters can post job listings through the API.
4. **Email/SMS Notifications**: Automatic notifications sent to candidates for new job postings.
