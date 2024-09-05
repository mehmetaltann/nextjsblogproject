import { mailOptions, transporter } from "@/lib/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, title, message } = await request.json();

  try {
    await transporter.sendMail({
      ...mailOptions,
      from: email,
      subject: title,
      text: `Gönderen: ${email}\n\n${message}`,
    });

    return NextResponse.json({ msg: "Mesajınız Gönderildi", success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Mesajınız Gönderilemedi",
      success: false,
    });
  }
}
