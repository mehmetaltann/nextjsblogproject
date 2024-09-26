import nodemailer from "nodemailer";

export const envEmail = process.env.EMAIL as string;
const pass = process.env.EMAIL_PASS as string;

if (!envEmail || !pass) {
  throw new Error("Email or password environment variables are not set");
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: envEmail,
    pass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error setting up transporter:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});
