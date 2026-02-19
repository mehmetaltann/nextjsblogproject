import nodemailer from "nodemailer";

const email = process.env.EMAIL as string;
const pass = process.env.EMAIL_PASS as string;

if (!email || !pass) {
  throw new Error("Email or password environment variables are not set");
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Transporter is ready to send emails");
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("Error setting up transporter:", error.message);
    } else {
      console.error("Unknown error setting up transporter:", error);
    }
  });