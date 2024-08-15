"use client";
import CategoryForm from "@/Components/AdminComponents/Category/CategoryForm";
import CategoryTable from "@/Components/AdminComponents/Category/CategoryTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

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

    const response = await axios.post("/api/category", {
      categoryName,
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchCategories();
      setCategoryName("");
    } else {
      setError("Kategory Kaydedilemedi");
    }
  };

  return (
    <div className="flex flex-col max-w-[400px] gap-1 pt-10 px-5 sm:pt-12 sm:pl-17">
      <CategoryForm
        onSubmitHandler={onSubmitHandler}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
      />
      <CategoryTable categories={categories} deleteCategory={deleteCategory} />
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
    </div>
  );
};

export default page;
