"use client";
import CategorySelect from "./CategorySelect";
import TextEditor from "./TextEditor";
import PhotoSection from "./PhotoSection";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "@/store/AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPostPanel = () => {
  const {
    title,
    setTitle,
    categories,
    description,
    isHome,
    setIsHome,
    cloudinaryImageId,
    setCloudinaryImageId,
    setDescription,
    isNewPost,
  } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      isHome,
      author: "Mehmet Altan",
      cloudinaryImageId,
      category: categories,
    };

    if (isNewPost) {
      const response = await axios.post("/api/blog", postData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setTitle("");
        setDescription("");
        setCategory([]);
        setCloudinaryImageId("");
        setIsHome(false);
        document.getElementById("blog-submit").reset();
      } else {
        toast.error("Bir Sıkıntı Var");
      }
    } else {
      
    }
  };

  console.log(isNewPost);

  return (
    <form
      onSubmit={onSubmitHandler}
      id="blog-submit"
      className="flex flex-col w-full md:w-3/4 gap-3 mt-6 mb-16"
    >
      <PhotoSection />
      <input
        className="bg-gray-50 border text-xl border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
        type="text"
        id="title"
        placeholder="Başlık"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />
      <div className="flex flex-col md:flex-row gap-2">
        <CategorySelect />
        <div className="md:flex-[2] min-w-[250px] flex ms-2 gap-2 items-center mt-2">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={isHome}
            onChange={() => setIsHome(!isHome)}
            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 opacity-70 font-semibold text-lg"
          >
            Anasayfada Gözüksün
          </label>
        </div>
      </div>
      <TextEditor />
      <button
        type="submit"
        className="w-full opacity-90 h-12 bg-color1 text-white text-base border hover:bg-white hover:text-color1 "
      >
        {isNewPost ? "Ekle" : "Güncelle"}
      </button>
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
    </form>
  );
};

export default AddPostPanel;
