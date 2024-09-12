"use client";
import CategoryForm from "@/Components/Admin/Category/CategoryForm";
import CategoryTable from "@/Components/Admin/Category/CategoryTable";
import axios from "axios";
import useSWR from "swr";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const { data, error, isLoading } = useSWR("/api/category", fetcher);
  console.log(data);

  const fetchCategories = async () => {
    const response = await axios.get("/api/category");
    setCategories(response.data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (mongoId) => {
    const response = await axios.delete(`/api/category`, {
      params: {
        id: mongoId,
      },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchCategories();
    } else {
      toast.error("İşlem Gerçekleşmedi");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      setError("Tüm alanlar dolu olmalıdır !");
      return;
    }

    if (!categoryColor) {
      setError("Tüm alanlar dolu olmalıdır !");
      return;
    }

    const response = await axios.post("/api/category", {
      categoryName,
      categoryColor,
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchCategories();
      setCategoryName("");
      setCategoryColor("");
    } else {
      setError("Kategory Kaydedilemedi");
    }
  };

  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col gap-1 w-full md:w-2/4 sm:pt-12 sm:pl-17"
    >
      <CategoryForm
        onSubmitHandler={onSubmitHandler}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        categoryColor={categoryColor}
        setCategoryColor={setCategoryColor}
      />
      <CategoryTable categories={categories} deleteCategory={deleteCategory} />
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
    </AnimationWrapper>
  );
};

export default page;
