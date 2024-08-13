import bcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import { ConnectDb } from "@/lib/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { isim, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    isim,
    email,
    password: hashedPassword,
  };
  await ConnectDb();
  await UserModel.create(userData);
  return NextResponse.json({ msg: "Kullanıcı Kaydedildi", success: true });
}
