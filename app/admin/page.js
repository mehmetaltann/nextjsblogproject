"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import Link from "next/link";
import NewPost from "@/Components/Admin/Start/NewPost";
import PostList from "@/Components/BlogList/PostList";
import { RiEdit2Line } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { AdminContext } from "@/store/AdminContext";
import { useContext } from "react";

const page = ({ type }) => {
  const {
    setCategories,
    setTitle,
    setDescription,
    setIsHome,
    setCloudinaryImageId,
    setSelectDefaultValue,
    setIsNewPost,
  } = useContext(AdminContext);

  const handleEdit = () => {
    setIsNewPost(false);
    const { _id, title, isHome, description, category, cloudinaryImageId } =
      data;
    const optionDefaultData = category.map((o) => {
      return { label: o.name, value: o.name };
    });
    setSelectDefaultValue(optionDefaultData);
    setCategories(category);
    setTitle(title);
    setDescription(description);
    setIsHome(isHome);
    setCloudinaryImageId(cloudinaryImageId);
  };

  return (
    <AnimationWrapper keyValue={type}>
      <div>Yeni Yazı</div>
      <div>

        <div>
          <div className="flex gap-2">
            <Link href={"/admin/write"} onClick={handleEdit}>
              <RiEdit2Line
                size={20}
                className="cursor-pointer"
                color="#295F98"
              />
            </Link>
            <Link href={"/"}>
              <FaTrashAlt
                size={20}
                className="cursor-pointer"
                color="#C75B7A"
              />
            </Link>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default page;
