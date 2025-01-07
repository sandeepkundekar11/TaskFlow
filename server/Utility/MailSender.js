import dotenv from "dotenv";
import AsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
dotenv.config({ path: "./config.env" });
const MailSender = AsyncHandler(
  async ({ senderEmail, receiverEmail, receiverName }) => {
    console.log({  user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,})
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `${senderEmail}`, // sender address
      to: `${receiverEmail}`, // list of receivers
      subject: "Task Flow Join invitation", // Subject line
      text: "Hello world?", // plain text body
      html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
        }
        .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
        .btn {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin: 10px 0;
        }
        .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Welcome to TaskFlow!
        </div>
        <div class="email-body">
            <p>Hi <strong>${receiverName}</strong>,</p>
            <p>Welcome to <strong>TaskFlow</strong>! You’ve been added as a user by <strong>Project Admin</strong> for the company</p>
            <p>TaskFlow is designed to help you collaborate on projects, manage tasks, and stay on track efficiently.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li><a href="" class="btn">Set Up Your Account</a></li>
            </ul>
            <p>We’re excited to have you on board!</p>
            <p>Best regards,</p>
            <p><strong>The TaskFlow Team</strong></p>
        </div>
        <div class="email-footer">
            &copy; 2025 TaskFlow. All rights reserved.
        </div>
    </div>
</body>
</html>
`, // html body
    }).then((message)=>{
        console.log(message)
    }).catch((err)=>{
        console.log(err.message,)
    })

    return info;
  }
);
export default MailSender;
