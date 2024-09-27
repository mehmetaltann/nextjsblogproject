"use client";
import { PostCategoryType, OptionType } from "@/lib/types/types";
import {
  createContext,
  useMemo,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

// Define types for the context
interface AdminContextProps {
  categories: PostCategoryType[];
  isHome: boolean;
  cloudinaryImageId: string;
  setCloudinaryImageId: Dispatch<SetStateAction<string>>;
  setIsHome: Dispatch<SetStateAction<boolean>>;
  setCategories: Dispatch<SetStateAction<PostCategoryType[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  options: OptionType[];
  setOptions: Dispatch<SetStateAction<OptionType[]>>;
  selectDefaultValue: OptionType[] | undefined;
  setSelectDefaultValue: Dispatch<SetStateAction<OptionType[] | undefined>>;
  isNewPost: boolean;
  setIsNewPost: Dispatch<SetStateAction<boolean>>;
  postId: string;
  setPostId: Dispatch<SetStateAction<string>>;
}

// Create context with initial values
export const AdminContext = createContext<AdminContextProps | undefined>(
  undefined
);

interface AdminContextProviderProps {
  children: ReactNode;
}

export const AdminContextProvider: FC<AdminContextProviderProps> = ({
  children,
}) => {
  const [selectDefaultValue, setSelectDefaultValue] = useState<
    OptionType[] | undefined
  >([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [isNewPost, setIsNewPost] = useState(true);
  const [categories, setCategories] = useState<PostCategoryType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState("");
  const [isHome, setIsHome] = useState(false);
  const [cloudinaryImageId, setCloudinaryImageId] = useState<string>("");

  const value = useMemo(
    () => ({
      categories,
      isHome,
      cloudinaryImageId,
      setCloudinaryImageId,
      setIsHome,
      setCategories,
      title,
      setTitle,
      description,
      setDescription,
      options,
      setOptions,
      selectDefaultValue,
      setSelectDefaultValue,
      isNewPost,
      setIsNewPost,
      postId,
      setPostId,
    }),
    [
      categories,
      isHome,
      cloudinaryImageId,
      title,
      description,
      options,
      selectDefaultValue,
      isNewPost,
      postId,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
