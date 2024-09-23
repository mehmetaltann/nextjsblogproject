"use client";
import { addInfo } from "@/app/actions/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const InfoForm = () => {
  const [formState, formAction] = useFormState(addInfo, null);

  useEffect(() => {
    toast.success(formState?.msg);
  }, [formState]);

  return (
    <form action={formAction} className="flex flex-col gap-2 p-3">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          id="isim"
          name="isim"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="İsim ..."
          required
        />
        <input
          id="default-checkbox"
          type="checkbox"
          name="isPic"
          className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
        />
        <label
          htmlFor="default-checkbox"
          className="opacity-70 font-semibold text-lg"
        >
          Resim
        </label>
      </div>
      <textarea
        id="content"
        name="content"
        rows="18"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="İçerik..."
        required
      />
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Ekle
      </button>
    </form>
  );
};

export default InfoForm;
