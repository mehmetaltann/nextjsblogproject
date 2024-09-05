import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // hostname
  secureConnection: false,
  port: 587, // port for secure SMTP
  requiresAuth: true,
  domains: ["gmail.com", "googlemail.com"],
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  to: email,
};
