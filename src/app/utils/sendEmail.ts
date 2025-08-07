import nodemailer from "nodemailer";
import { config } from "../config";

export const sendEmail = async (to: string, html: string) => {
  try {
    console.log("Attempting to send email...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: config.node_env === "production", // Port 587 uses STARTTLS, so `secure` should be `false`
      auth: {
        user: "anis.devs@gmail.com", // Use environment variables
        pass: "ddxg nwfh ljck natz", // Use environment variables
      },
    });

    await transporter.sendMail({
      from: "anis.devs@gmail.com",
      to,
      subject: "Hello Reset your password ✔",
      text: "Hello! have you forgot your pass?",
      html,
    });

    console.log("Email sent successfully! 🎉");
  } catch (error) {
    console.error("Failed to send email. Error:", error);
    // You can add more specific error handling here
  }
};
