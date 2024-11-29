"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import CategorySelect from "./CategorySelect";
import TextEditor from "./TextEditor";
import PhotoSection from "./PhotoSection";
import { useContext, useState } from "react";
import { AdminContext } from "@/store/AdminContext";
import { addPost, updatePost } from "@/app/actions/actions";
import { toast } from "react-toastify";
import { PostType } from "@/lib/types/types";

interface Category {
  name: string;
}

interface AddPostPanelProps {
  allCategories: Category[];
}

type filteredPostType = Omit<PostType, "date" | "updated_at" | "created_at">;

const AddPostPanel = ({ allCategories }: AddPostPanelProps) => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within a AdminContextProvider"
    );
  }
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
  } = context;

  const [isLoading, setIsLoading] = useState(false);

  const optionsData = allCategories.map((o) => ({
    label: o.name,
    value: o.name,
  }));

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const postData: filteredPostType = {
      title,
      description,
      isHome,
      author: "Mehmet Altan",
      cloudinaryImageId,
      category: categories,
      _id: "",
    };

    if (isNewPost) {
      try {
        const response = await addPost(postData);
        const { isSuccess, msg } = response as {
          isSuccess: boolean;
          msg: string;
        };
        if (isSuccess) {
          setTitle("");
          setDescription("");
          setCloudinaryImageId("");
          setIsHome(false);
          (document.getElementById("blog-submit") as HTMLFormElement).reset();
          toast.success(msg);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    } else {
      postData._id = postId;
      try {
        const response = await updatePost(postData);
        const { msg } = response as {
          msg: string;
        };
        toast.success(msg);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
    setIsLoading(false);
  };

  return (
    <AnimationWrapper
      keyValue="writePost"
      className="flex w-full p-6 mb-6 pb-6 md:p-0"
    >
      <form
        onSubmit={onSubmitHandler}
        id="blog-submit"
        className="flex flex-col w-full gap-3 mt-6 mb-16"
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
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
          className="w-full opacity-90 h-12 bg-color1 text-white text-base border hover:bg-white hover:text-color1"
          disabled={isLoading}
        >
          {isLoading ? "Yükleniyor..." : isNewPost ? "Ekle" : "Güncelle"}
        </button>
      </form>
    </AnimationWrapper>
  );
};

export default AddPostPanel;
