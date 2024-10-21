# Job Posting Board with Email Automation and OTP Verification

A job posting platform where recruiters can register, post jobs, and automatically notify candidates via email using Nodemailer. The project includes secure OTP-based login and verification for both email and mobile numbers using Twilio. 
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

- **Frontend**: React.jsfor user interface and form handling.
- **Backend**: Node.js, Express for server-side logic.
- **Database**: MongoDB for storing user data, job posts, and OTPs.
- **Email Automation**: Nodemailer for sending automated emails.
- **OTP SMS**: Twilio for sending OTPs via SMS.
- **Environment Variables**: Managed using `.env` for storing sensitive data like API keys.
