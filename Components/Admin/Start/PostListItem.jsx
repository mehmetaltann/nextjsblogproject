"use client";
import Link from "next/link";
import { AdminContext } from "@/store/AdminContext";
import { useContext } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { getFormatDate } from "@/lib/utils/helpers";

const PostListItem = ({ post, deleteBlog }) => {
  const { _id, title, isHome, description, category, cloudinaryImageId, date } =
    post;
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

  const handleEditPostPageTransfer = () => {
    setIsNewPost(false);
    const optionDefaultData = category.map((o) => {
      return { label: o.name, value: o.name };
    });
    setSelectDefaultValue(optionDefaultData);
    setCategories(category);
    setTitle(title);
    setPostId(_id);
    setDescription(description);
    setIsHome(isHome);
    setCloudinaryImageId(cloudinaryImageId);
  };

  return (
    <>
      <div className="p-3 flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center hover:bg-gray-200">
        <p className="md:w-5/12 text-left text-wrap">{title}</p>
        <p className="md:w-2/12 text-left text-wrap">{getFormatDate(date)}</p>
        <div className=" md:w-2/12 flex flex-row flex-wrap gap-1">
          {category &&
            category.map((category) => (
              <span
                key={category.name}
                className="pt-[3px] text-xs leading-none text-color4 mb-1 md:mb-0 md:me-2 "
              >
                #{category.name}
              </span>
            ))}
        </div>
        <div className="flex md:w-1/12 gap-2">
          <Link href={"/admin/write"} onClick={handleEditPostPageTransfer}>
            <RiEdit2Line size={20} className="cursor-pointer" color="#295F98" />
          </Link>
          <FaTrashAlt
            size={20}
            className="cursor-pointer"
            color="#C75B7A"
            onClick={() => deleteBlog(_id)}
          />
        </div>
        <div class="flex md:w-2/12 items-center">
          <input
            disabled
            checked={isHome}
            id="inline-disabled-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            htmlFor="inline-disabled-checkbox"
            className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
          >
            Ana Sayfa
          </label>
        </div>
      </div>

      <hr />
    </>
  );
};

export default PostListItem;
