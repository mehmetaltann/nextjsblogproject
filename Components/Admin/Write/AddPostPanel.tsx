"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import CategorySelect from "./CategorySelect";
import TextEditor from "./TextEditor";
import PhotoSection from "./PhotoSection";
import { useContext, useState, useRef } from "react";
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

type SubmitPayload = Omit<
  PostType,
  "_id" | "date" | "updatedAt" | "createdAt" | "slug"
>;

const AddPostPanel = ({ allCategories }: AddPostPanelProps) => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within a AdminContextProvider",
    );
  }

  const {
    title,
    setTitle,
    categories,
    isHome,
    setIsHome,
    cloudinaryImageId,
    setCloudinaryImageId,
    setDescription,
    isNewPost,
    postId,
  } = context;

  const editorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const optionsData = allCategories.map((o) => ({
    label: o.name,
    value: o.name,
  }));

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const html = editorRef.current?.getContent() || "";

    const basePostData: SubmitPayload = {
      title,
      description: html,
      isHome,
      author: "Mehmet Altan",
      cloudinaryImageId,
      category: categories,
    };

    try {
      const response = isNewPost
        ? await addPost(basePostData)
        : await updatePost({ ...basePostData, _id: postId });

      const { isSuccess, msg } = response as {
        isSuccess: boolean;
        msg: string;
      };

      if (isSuccess) {
        setTitle("");
        setDescription("");
        setCloudinaryImageId("");
        setIsHome(false);
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error("Beklenmeyen bir hata oluştu.");
      console.error(error);
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
        className="flex flex-col w-full gap-4 mt-6 mb-16"
      >
        <PhotoSection isNewPost={isNewPost} />

        <input
          className="border text-xl border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          type="text"
          placeholder="Başlık"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <div className="flex flex-col md:flex-row gap-4">
          <CategorySelect optionsData={optionsData} />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isHome}
              onChange={() => setIsHome(!isHome)}
              className="w-5 h-5"
            />
            <label className="opacity-70 font-semibold">
              Anasayfada Gözüksün
            </label>
          </div>
        </div>

        <TextEditor ref={editorRef} />

        <button
          type="submit"
          className="w-full h-12 bg-color1 text-white border hover:bg-white hover:text-color1 transition"
          disabled={isLoading}
        >
          {isLoading ? "Yükleniyor..." : isNewPost ? "Ekle" : "Güncelle"}
        </button>
      </form>
    </AnimationWrapper>
  );
};

export default AddPostPanel;
