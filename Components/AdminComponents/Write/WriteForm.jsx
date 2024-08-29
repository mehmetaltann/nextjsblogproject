"use client";
import Image from "next/image";
import axios from "axios";
import Select from "react-select";
import TextEditor from "./TextEditor";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { assets } from "@/Assets/assets";
import { CldImage } from "next-cloudinary";
import { BlogContext } from "@/store/BlogContext";
import "react-toastify/dist/ReactToastify.css";

const WriteForm = () => {
  const { blogCont, setBlogCont } = useContext(BlogContext);
  const [uploadedImageId, setUploadedImageId] = useState(
    blogCont?.cloudinaryImageId || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState(blogCont?.title || []);
  const [description, setDescription] = useState(blogCont?.description || "");
  const [category, setCategory] = useState(blogCont?.category || []);

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
      console.log(response);
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
      setCategory(null);
      setUploadedImageId(null);
      document.getElementById("blog-submit").reset();
    } else {
      toast.error("Bir Sıkıntı Var");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        id="blog-submit"
        className="flex flex-col w-full md:w-3/4 md:flex-row gap-5 mt-10 mx-8"
      >
        <div className="flex-[5] flex flex-col gap-5">
          <input
            className="p-3 border border-b-primary"
            type="text"
            id="title"
            placeholder="Başlık"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <TextEditor
            setDescription={setDescription}
            description={description}
            placeholder="Yazınız ..."
          />
        </div>
        <div className="flex-[2] flex flex-col gap-3 text-xs text-[#555] p-2.5 border border-solid border-[lightgray]">
          <div className="flex flex-col">
            <h2 className="flex font-semibold text-lg">Kategori Seç</h2>
            {categories && (
              <Select
                isMulti
                valueField="value"
                instanceId="categoryType"
                placeholder="Kategori ..."
                options={categories}
                className="basic-multi-select mt-4 w-full "
                classNamePrefix="select"
                onChange={(value) => setCategory(value)}
              />
            )}
          </div>
          <hr />
          <div className="flex flex-col">
            <h2 className="flex font-semibold text-lg">Kapak Resmi Seç</h2>
            {isUploading && (
              <p className="text-xl text-gray-600 font-semibold pb-4">
                Resim Yükleniyor
              </p>
            )}

            {!uploadedImageId && !isUploading && (
              <>
                <label htmlFor="image">
                  <Image
                    className="mt-3 mx-auto w-full h-auto"
                    src={assets.upload_area}
                    width="0"
                    height="0"
                    alt="upload_img"
                    priority
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

            {uploadedImageId && !isUploading && (
              <CldImage
                src={uploadedImageId}
                description="image upload"
                height={600}
                width={600}
                alt="down-pic"
              />
            )}
          </div>
          <hr />
          <button
            type="submit"
            className="w-full h-10 bg-primary text-gray-800 hover:text-black"
          >
            EKLE
          </button>
        </div>

        <ToastContainer
          theme="dark"
          closeOnClick
          autoClose={2000}
          position="bottom-left"
        />
      </form>
    </>
  );
};

export default WriteForm;
