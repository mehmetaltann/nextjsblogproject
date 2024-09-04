"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Kayıt Yapılamadı");
    }
  };

  return (
    <div className="text-center my-8">
      <form
        className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-gray"
        onSubmit={onSubmitHandler}
      >
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          value={email}
          placeholder="Email Adresinizi Giriniz"
          className="pl-4 outline-none"
        />
        <button
          type="submit"
          className="border-l border-gray py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
        >
          Takip Et
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
