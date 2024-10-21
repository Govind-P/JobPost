import moment from "moment";
export const otpTemplate=(otp)=>{
    return (`
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP </title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f7f7f7;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            h1 {
                color: #333333;
            }
            .otp {
                font-size: 20px;
                font-weight: bold;
                color: #007bff;
                padding: 10px;
                border: 2px solid #007bff;
                border-radius: 4px;
                display: inline-block;
                margin: 20px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777777;
            }
        </style>
    </head>
    <body>

    <div class="container">
        <h1>Your OTP Code</h1>
        <p>Hello,</p>
        <p>Thank you for using our service! Your One-Time Password (OTP) is:</p>
        <div class="otp">${otp}</div>
        <p>This code is valid for the next 10 minutes.</p>
        <p>Do not share with any one.</p>
        <p>If you did not request this, please ignore this email.</p>
        
        <div class="footer">
            <p>Best regards,</p>
            <p>Your Company Name</p>
        </div>
    </div>
    </body>
    </html>`
    )
};


export const jobTemplate=(details,company)=>{
    const date=moment(details.endDate).format('YYYY-MM-DD HH:mm:ss');
    return (
        `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Job Details</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
            }
            .header {
                background-color: #007bff; /* Blue background */
                color: white;
                padding: 20px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
            .job-details {
                background-color: white; /* White background */
                padding: 20px;
                border: 1px solid #ddd;
                border-top: none;
            }
            .section {
                margin-bottom: 15px;
            }
            .section h3 {
                margin: 0;
                font-size: 18px;
                color: #333;
            }
            .section p {
                margin: 5px 0;
                font-size: 16px;
                color: #555;
            }
            .best-regards {
                margin-top: 30px;
                font-size: 16px;
                color: #333;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Job Title Section -->
            <div class="header">
                ${details.title} at <span> ${company}</span>
            </div>

            <!-- Job Details Section -->
            <div class="job-details">
                <div class="section">
                    <p>${details.description}</p>
                </div>


                <div class="section">
                    <h3>Job Title:</h3>
                    <p>${details.title}</p>
                </div>

                <div class="section">
                    <h3>Experience:</h3>
                    <p>${details.experience}</p>
                </div>

                <div class="section">
                    <h3>End Date:</h3>
                    <p>${date}</p>
                </div>

                <!-- Best Regards Section -->
                <div class="best-regards">
                    Best regards, <br>
                    ${company}
                </div>
            </div>
        </div>

    </body>
    </html> `
    )
}