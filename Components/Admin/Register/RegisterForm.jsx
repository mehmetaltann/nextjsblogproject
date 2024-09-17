"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [isim, setIsim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    setError("");
    e.preventDefault();
    if (!isim || !email || !password) {
      setError("Tüm alanlar dolu olmalıdır !");
      return;
    }

    const responseUserCheck = await axios.post("/api/userCheck", {
      email,
    });

    if (responseUserCheck.data) {
      setError("Bu Kullanıcı Kayıtlıdır");
      return;
    }

    const response = await axios.post("/api/register", {
      isim,
      email,
      password,
    });
    if (response.data.success) {
      const form = e.target;
      form.reset();
      router.push("/login");
    } else {
      setError("Kullanıcı Kaydedilemedi");
    }
  };

  return (
    <>
      <h1 className="text-xl text-[teal] mb-2 px-4 py-6 rounded-lg">
        Kayıt Formu
      </h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-3 bg-[#f9f9f9]"
      >
        <input
          required
          type="text"
          placeholder="İsim ..."
          name="isim"
          onChange={(e) => setIsim(e.target.value)}
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <input
          required
          type="email"
          placeholder="Email ..."
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <input
          required
          type="password"
          placeholder="Şifre ..."
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <button
          type="submit"
          className="bg-[teal] cursor-pointer text-[white] p-2.5 border-[none]"
        >
          Kayıt Ol
        </button>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}

        <p className="text-xs text-center">
          Mevcut Hesabınız Var mı ?
          <Link
            href="/auth"
            className="font-medium text-color1 hover:underline"
          >
            Giriş
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
