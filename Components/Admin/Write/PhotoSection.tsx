"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { AdminContext } from "@/store/AdminContext";
import { useContext, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { toast } from "react-toastify";

interface PhotoSectionProps {
  isNewPost: boolean;
}

const PhotoSection = ({ isNewPost }: PhotoSectionProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );
  }
  const { cloudinaryImageId, setCloudinaryImageId } = context;

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Sadece JPG, PNG veya GIF dosyaları yükleyebilirsiniz.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/image-upload", formData);
      setCloudinaryImageId(response.data.publicId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Yükleme hatası");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col border border-grey-200 rounded-lg">
      {isUploading && (
        <p className="text-xl text-gray-600 font-semibold pb-4">
          Resim Yükleniyor
        </p>
      )}

      {!cloudinaryImageId && !isUploading && (
        <>
          <label htmlFor="image" className="text-center">
            <IoIosCloudUpload className="mt-3 mx-auto" size={150} />
            <span className="opacity-70">Kapak Resmi</span>
          </label>
          <input
            onChange={handleFileUpload}
            type="file"
            id="image"
            name="image"
            hidden
          />
        </>
      )}

      {cloudinaryImageId && !isUploading && isNewPost && (
        <CldImage
          src={cloudinaryImageId}
          sizes="(max-width: 600px) 100vw, 600px"
          height={600}
          width={600}
          alt="down-pic"
          priority={true}
        />
      )}

      {cloudinaryImageId && !isUploading && !isNewPost && (
        <>
          <label htmlFor="image" className="text-center">
            <CldImage
              src={cloudinaryImageId}
              sizes="(max-width: 600px) 100vw, 600px"
              height={600}
              width={600}
              alt="down-pic"
              priority={true}
            />
          </label>
          <input
            onChange={handleFileUpload}
            type="file"
            id="image"
            name="image"
            hidden
          />
        </>
      )}
    </div>
  );
};

export default PhotoSection;
