"use client";
import {
  createContext,
  useMemo,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import { PostType } from "@/lib/types/types";

type ClientContextProviderProps = {
  children: ReactNode;
};

type ClientStateContextType = {
  allPosts: PostType[];
  setAllPosts: Dispatch<SetStateAction<PostType[]>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  searchItem: string;
  setSearchItem: Dispatch<SetStateAction<string>>;
};

export const ClientContext = createContext<ClientStateContextType | null>(null);

export const ClientContextProvider: FC<ClientContextProviderProps> = ({
  children,
}) => {
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchItem, setSearchItem] = useState<string>("");

  const value = useMemo(
    () => ({
      allPosts,
      setAllPosts,
      selectedCategory,
      setSelectedCategory,
      searchItem,
      setSearchItem,
    }),
    [allPosts, selectedCategory, searchItem]
  );

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};
