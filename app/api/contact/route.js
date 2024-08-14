import { ConnectDb } from "@/lib/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, title, message } = await request.json();
  const contactMes = {
    email,
    title,
    message,
  };

  return NextResponse.json({ msg: "Yorumunuz Kaydedildi", success: true });
}
