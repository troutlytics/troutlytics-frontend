import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Named async function
const handleEmailSending = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name, email, message } = req.body;

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Email configuration
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER, // Use environment variables
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: process.env.NEXT_PUBLIC_RECEIVER_EMAIL, // Your receiving email address
      subject: `New Message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email" , error: error.message });
  }
};

// Export the named function
export default handleEmailSending;
