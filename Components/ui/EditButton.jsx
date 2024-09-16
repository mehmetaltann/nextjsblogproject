import { RiEdit2Line } from "react-icons/ri";
import { useContext } from "react";
import { AdminContext } from "@/store/AdminContext";

const buttonClassName =
  "flex gap-2 items-center justify-center py-2 px-4 font-semibold shadow-md rounded-lg text-white bg-blue-600 shadow-blue-400/40";

const EditButton = ({ post }) => {
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
    <button className={buttonClassName} onClick={handleEditPostPageTransfer}>
      <RiEdit2Line /> Edit
    </button>
  );
};

export default EditButton;
