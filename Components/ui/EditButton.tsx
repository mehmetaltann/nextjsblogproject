import { RiEdit2Line } from "react-icons/ri";
import { useContext } from "react";
import { AdminContext } from "@/store/AdminContext";
import { PostType } from "@/lib/types/types";

interface EditButtonProps {
  post: PostType;
}

const buttonClassName =
  "flex gap-2 items-center justify-center py-2 px-4 font-semibold shadow-md rounded-lg text-white bg-blue-600 shadow-blue-400/40";

const EditButton: React.FC<EditButtonProps> = ({ post }) => {
  const { _id, title, isHome, description, category, cloudinaryImageId } = post;

  const context = useContext(AdminContext);

  if (!context)
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );

  const {
    setCategories,
    setTitle,
    setDescription,
    setIsHome,
    setCloudinaryImageId,
    setSelectDefaultValue,
    setIsNewPost,
    setPostId,
  } = context;

  const handleEditPostPageTransfer = () => {
    if (
      !setCategories ||
      !setTitle ||
      !setDescription ||
      !setIsHome ||
      !setCloudinaryImageId ||
      !setSelectDefaultValue ||
      !setIsNewPost ||
      !setPostId
    ) {
      console.error("Context is not properly initialized.");
      return;
    }

    setIsNewPost(false);

    const optionDefaultData = category.map((o) => ({
      label: o.name as string,
      value: o.name as string,
    }));

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
