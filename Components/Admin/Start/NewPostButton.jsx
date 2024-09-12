"use client"
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import { AdminContext } from "@/store/AdminContext";
import { useContext } from "react";

const NewPostButton = () => {
  const {
    setCategories,
    setTitle,
    setDescription,
    setIsHome,
    setCloudinaryImageId,
    setSelectDefaultValue,
    setIsNewPost,
    setPostId,
  } = useContext(AdminContext);

  const handleNewPostPageTransfer = () => {
    setIsNewPost(true);
    setSelectDefaultValue();
    setCategories([]);
    setTitle("");
    setPostId("");
    setDescription("");
    setIsHome(false);
    setCloudinaryImageId(null);
  };

  return (
    <Link href="/admin/write">
      <button
        onClick={handleNewPostPageTransfer}
        type="button"
        className="px-6 py-3.5 text-lg max-w-52 font-medium text-white inline-flex items-center bg-color1 hover:bg-color2 focus:ring-4 focus:outline-none focus:ring-color6 rounded-lg text-center"
      >
        Yeni Post
        <FaPencilAlt className="ms-2" />
      </button>
    </Link>
  );
};

export default NewPostButton;
