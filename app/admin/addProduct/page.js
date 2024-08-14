"use client";
import axios from "axios";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Tatil ",
    author: "Mehmet Altan",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("author", data.author);
    formData.append("category", data.category);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Tatil ",
        author: "Mehmet Altan",
        authorImg: "/author_img.png",
      });
    } else {
      toast.error("Bir Sıkıntı Var");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl text-gray-600 font-semibold pb-4">
          Yeni Blog Yazısı
        </p>
        <label htmlFor="image">
          <Image
            className="mt-3"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="upload_img"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl"></p>
        <input
          className="w-full sm:w-[700px] mt-4 px-4 py-3 border"
          type="text"
          id="image"
          placeholder="Başlık"
          name="title"
          required
          onChange={onChangeHandler}
          value={data.title}
        />
        <p className="text-xl"></p>
        <select
          className="w-full sm:w-[700px] mt-4 px-4 py-3 border text-gray-500"
          name="category"
          onChange={onChangeHandler}
          value={data.category}
        >
          <option value="Teknoloji">Teknoloji</option>
          <option value="Yaşam">Yaşam</option>
          <option value="Tatil">Tatil</option>
        </select>
        <p className="text-xl"></p>
        <textarea
          className="w-full sm:w-[700px] mt-4 px-4 py-3 border"
          type="text"
          id="image"
          placeholder="Yazı"
          name="description"
          required
          rows={12}
          onChange={onChangeHandler}
          value={data.description}
        />
        <br />
        <button type="submit" className="mt-4 w-40 h-12 bg-black text-white">
          EKLE
        </button>
      </form>
    </>
  );
};

export default page;
