import EmailModel from "@/lib/models/EmailModel";
import { ConnectDb } from "@/lib/config/db";
import { NextResponse } from "next/server";

const LoadDb = async () => {
  await ConnectDb();
};

LoadDb();

export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function POST(request) {
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({
    success: true,
    msg: "Email Takip istesine Eklendi",
  });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Mail Silindi" });
}
