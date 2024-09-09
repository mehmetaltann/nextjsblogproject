import bcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { isim, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      isim,
      email,
      password: hashedPassword,
    };
    await UserModel.create(userData);
    return NextResponse.json({ msg: "Kullanıcı Kaydedildi", success: true });
  } catch (error) {
    return NextResponse.json({
      msg: "Server'da bir sıkıntı var, Kullanıcı Kaydedilemedi",
      success: false,
    });
  }
}
