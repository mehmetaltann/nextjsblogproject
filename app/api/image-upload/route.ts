import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
}); //.env dosyamızdan hesap bilgilerini çekiyoruz.

interface CloudinaryUploadResult {
  public_id: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
  //Eğer güvenlik hatası alırsanız ekeleyebilirsiniz.
  //Ancak bunu eklemenizi tavsiye etmiyorum.
  try {
    const formData = await request.formData(); //Yüklediğimiz resim datası
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ msg: "Dosya Bulunamadı" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes); //Resmi koda çeviriyoruz

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "next-cloudinary-uploads" }, 
          //cloudinary'de yükleyeceğimiz klasörün adı
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        upload_stream.end(buffer);
      }
    );

    return NextResponse.json({ publicId: result.public_id }); 
    //publicId, cloudinary'nin verdiği Id
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        msg:
          "Resim Yüklenemedi: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
