# Job Posting Board with Email Automation and OTP Verification

A job posting platform where recruiters can register, post jobs, and automatically notify candidates via email using Nodemailer. The project includes secure OTP-based login and verification for both email and mobile numbers using Twilio. 

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend Setup](#frontend-setup)
- [Run Frontend Locally](#run-frontend-locally)
- [Backend Setup](#backend-setup)
- [Run Backend Locally](#run-backend-locally)

## Features

- **Recruiter Registration & Job Posting**
  - Recruiters can register and post jobs to the platform.
  - All job postings are stored in the database.
  
- **Email Automation**
  - Job updates are automatically emailed to candidates using Nodemailer.

- **OTP Verification**
  - **Mobile OTP**: Mobile number verification and login via OTP using Twilio.
  - **Email OTP**: Email verification and login via OTP using Nodemailer.
  
- **Twilio Integration**
  - Used for sending OTP via SMS for mobile verification and login.

## Tech Stack

- **Frontend**: React.js for user interface and form handling.
- **Backend**: Node.js, Express for server-side logic.
- **Database**: MongoDB for storing user data, job posts, and OTPs.
- **Email Automation**: Nodemailer for sending automated emails.
- **OTP SMS**: Twilio for sending OTPs via SMS.
- **Environment Variables**: Managed using `.env` for storing sensitive data like API keys.

## Frontend Setup
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

## Run Frontend Locally:
1. **Start the Development Server: **:
   To start the React development server, run:
   ```bash
   npm start
1. **Access the Application:**:
   The frontend will be running on http://localhost:3000. Open this URL in your browser to view the application.


## Backend Setup
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

## Run Backend Locally
Once the setup is complete, you can run the backend on your local machine:

1. **Start the Development Server**:
    To start the Node.js server, run:
    ```bash
    npm run dev
2. **Access the API**: 
    The backend will be running on http://localhost:5000. You can test the API endpoints using tools like Postman.

