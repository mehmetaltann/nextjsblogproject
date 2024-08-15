"use client";
import Image from "next/image";
import axios from "axios";
import Select from "react-select";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { assets } from "@/Assets/assets";
import { CldImage } from "next-cloudinary";
import "react-toastify/dist/ReactToastify.css";

const AddPostForm = () => {
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get("/api/category");
    const options = response.data.categories.map((o) => {
      return { label: o.name, value: o.name };
    });
    setCategories(options);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/image-upload", formData);
      setUploadedImageId(response.data.publicId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      author: "Mehmet Altan",
      cloudinaryImageId: uploadedImageId,
      category: category.map((o) => {
        return { name: o.value };
      }),
    };

    const response = await axios.post("/api/blog", postData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setTitle("");
      setDescription("");
      setCategory([]);
      setUploadedImageId(null);
      document.getElementById("blog-submit").reset();
    } else {
      toast.error("Bir Sıkıntı Var");
    }
  };

  return (
    <>
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
      <form
        onSubmit={onSubmitHandler}
        id="blog-submit"
        className="pt-5 px-5 sm:pt-12 sm:pl-16"
      >
        {isUploading && (
          <p className="text-xl text-gray-600 font-semibold pb-4">
            Resim Yükleniyor
          </p>
        )}

        {!uploadedImageId && !isUploading && (
          <>
            <p className="text-xl text-gray-600 font-semibold pb-4">
              Yeni Blog Yazısı
            </p>
            <label htmlFor="image">
              <Image
                className="mt-3"
                src={assets.upload_area}
                width={200}
                height={140}
                alt="upload_img"
              />
            </label>
            <input
              onChange={handleFileUpload}
              type="file"
              id="image"
              hidden
              required
            />
          </>
        )}

        {uploadedImageId && !isUploading && (
          <>
            <p className="text-xl text-gray-600 font-semibold pb-4">
              Yeni Blog Yazısı
            </p>
            <CldImage
              src={uploadedImageId}
              description="image upload"
              height={600}
              width={600}
              alt="down-pic"
            />
          </>
        )}

        <p className="text-xl"></p>
        <input
          className="w-full sm:w-[700px] mt-4 px-4 py-3 border"
          type="text"
          id="image"
          placeholder="Başlık"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="text-xl"></p>

        {categories && (
          <Select
            isMulti
            valueField="value"
            placeholder="Kategori ..."
            options={categories}
            className="basic-multi-select mt-4 sm:w-[700px] w-full "
            classNamePrefix="select"
            onChange={(value) => setCategory(value)}
          />
        )}

        <p className="text-xl"></p>
        <textarea
          className="w-full sm:w-[700px] mt-4 px-4 py-3 border"
          type="text"
          id="image"
          placeholder="Yazı"
          required
          rows={12}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <button type="submit" className="mt-4 w-40 h-12 bg-black text-white">
          EKLE
        </button>
      </form>
    </>
  );
};

export default AddPostForm;

/*

*/
