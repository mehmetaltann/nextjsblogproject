import { ConnectDb } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log(email)
    await ConnectDb();
    const user = await UserModel.findOne({ email }).select("_id");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ msg: error });
  }
}
