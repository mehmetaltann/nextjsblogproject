"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { toast } from "react-toastify";

const InfoProfilPic = ({ infoData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [cloudinaryImageId, setCloudinaryImageId] = useState(infoData.content);

  const handleFileUpload = async (event) => {
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
      toast.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInfoUpdate = async () => {
    try {
      const { msg } = await updateInfo({
        _id: infoData._id,
        content: cloudinaryImageId,
        name: infoData.name,
      });
      toast.success(msg);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 align-center justify-center">
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

        {cloudinaryImageId && !isUploading && (
          <>
            <label htmlFor="image" className="text-center">
              <CldImage
                src={cloudinaryImageId}
                description="image upload"
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
      <button
        onClick={handleInfoUpdate}
        type="button"
        className="self-end mt-2 text-white bg-blue-700 hover:bg-blue-800 w-2/6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Güncelle
      </button>
    </div>
  );
};

export default InfoProfilPic;
