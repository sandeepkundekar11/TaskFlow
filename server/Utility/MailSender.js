import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config({ path: "./config.env" });

const MailSender = async ({
  senderEmail,
  senderName,
  receiverEmail,
  receiverName,
}) => {
  try {
    // Validate inputs
    if (!senderEmail || !receiverEmail || !receiverName) {
      throw new Error(
        "Missing required parameters: senderEmail, receiverEmail, or receiverName"
      );
    }
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    // Email content
    const emailContent = {
      from: senderEmail, // Sender address
      to: receiverEmail, // Receiver address
      subject: "Task Flow Join Invitation", // Subject line
      text: "Welcome to TaskFlow!", // Plain text version
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border: 1px solid #dddddd;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                  background-color: #4CAF50;
                  color: white;
                  text-align: center;
                  padding: 20px;
                  font-size: 24px;
              }
              .email-body {
                  padding: 20px;
              }
              .btn {
                  display: inline-block;
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 4px;
              }
              .btn:hover {
                  background-color: #45a049;
              }
              .email-footer {
                  background-color: #f1f1f1;
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                  color: #777777;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">Welcome to TaskFlow!</div>
              <div class="email-body">
                  <p>Hi <strong>${receiverName}</strong>,</p>
                  <p>Welcome to <strong>TaskFlow</strong>! You’ve been added as a user by <strong>${senderName}</strong> for the company.</p>
                  <p>TaskFlow helps you collaborate on projects, manage tasks, and stay organized.</p>
                  <p><a href=${process.env.BASE_USER_LOGIN_URL} class="btn">Set Up Your Account</a></p>
                  <p>Best regards,</p>
                  <p><strong>The TaskFlow Team</strong></p>
              </div>
              <div class="email-footer">
                  &copy; 2025 TaskFlow. All rights reserved.
              </div>
          </div>
      </body>
      </html>
      `,
    };

    // Send email
    const info = await transporter.sendMail(emailContent);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

export default MailSender;
