import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse({ msg: "Dosya Bulunamadı" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const upload_stream = cloudinary.uploader.upload_stream(
        { folder: "next-cloudinary-uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      upload_stream.end(buffer);
    });

    return NextResponse.json({ publicId: result.public_id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Resim Yüklenemedi" + error });
  }
}
