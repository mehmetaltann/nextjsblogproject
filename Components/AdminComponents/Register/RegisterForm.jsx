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
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[$lightGreen]">
      <h1 className="text-xl text-[teal] mb-2 border px-4 py-6 rounded-full">Kayıt Formu</h1>
      <form className="flex flex-col bg-[white] w-full md:w-2/3 lg:w-1/4 gap-5 p-[50px]">
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
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Giriş
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
