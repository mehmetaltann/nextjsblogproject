"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { AdminContext } from "@/store/AdminContext";
import { useContext, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";

const PhotoSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { cloudinaryImageId, setCloudinaryImageId } =
    useContext(AdminContext);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/image-upload", formData);
      setCloudinaryImageId(response.data.publicId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col">
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

      {cloudinaryImageId && !isUploading && (
        <CldImage
          src={cloudinaryImageId}
          description="image upload"
          height={600}
          width={600}
          alt="down-pic"
          priority={true}
        />
      )}
    </div>
  );
};

export default PhotoSection;
