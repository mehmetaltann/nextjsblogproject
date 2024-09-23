"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import CategorySelect from "./CategorySelect";
import TextEditor from "./TextEditor";
import PhotoSection from "./PhotoSection";
import { useContext } from "react";
import { AdminContext } from "@/store/AdminContext";
import { addPost, updatePost } from "@/app/actions/actions";
import { toast } from "react-toastify";

const AddPostPanel = ({ type, allCategories }) => {
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
    postId,
  } = useContext(AdminContext);

  const optionsData = allCategories.map((o) => {
    return { label: o.name, value: o.name };
  });

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
      try {
        const { isSuccess, msg } = await addPost(postData);
        if (isSuccess) {
          setTitle("");
          setDescription("");
          setCategory([]);
          setCloudinaryImageId("");
          setIsHome(false);
          document.getElementById("blog-submit").reset();
          toast.success(msg);
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        postData["_id"] = postId;
        const { msg } = await updatePost(postData);
        toast.success(msg);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <AnimationWrapper
      keyValue={type}
      className="flex w-full p-6 md:w-3/4 mb-6 pb-6 md:p-0"
    >
      <form
        onSubmit={onSubmitHandler}
        id="blog-submit"
        className="flex flex-col w-full md:w-3/4 gap-3 mt-6 mb-16"
      >
        <PhotoSection isNewPost={isNewPost} />
        <input
          className="border text-xl border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
          type="text"
          id="title"
          placeholder="Başlık"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <div className="flex flex-col md:flex-row gap-2">
          <CategorySelect optionsData={optionsData} />
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
      </form>
    </AnimationWrapper>
  );
};

export default AddPostPanel;
