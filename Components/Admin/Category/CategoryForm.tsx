"use client";
import { addCategory } from "@/app/actions/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [formState, formAction] = useFormState(addCategory, null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(formState)) return;

    if (formState?.msg) {
      toast.success(formState.msg);
      setIsLoading(false);
    }
  }, [formState]);

  const handleFormAction = (formData: any) => {
    setIsLoading(true);
    formAction(formData);
  };

  return (
    <form action={handleFormAction}>
      <div className="flex gap-2 rounded-lg shadow-sm">
        <input
          type="text"
          id="catName"
          name="catName"
          placeholder="Kategori İsmi"
          className="py-3 px-4 block w-full border border-gray-400 shadow-sm rounded-s-lg focus:z-10  dark:bg-neutral-900 "
        />
        <input
          type="text"
          id="catColor"
          name="catColor"
          placeholder="Renk #"
          className="py-3 px-4 block w-full border border-gray-400 shadow-sm rounded-e-lg focus:z-10  dark:bg-neutral-900 "
        />
        <button
          type="submit"
          disabled={isLoading}
          className="text-xl py-3 px-8 inline-flex justify-center items-center gap-x-2 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? "Yükleniyor..." : "Ekle"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
