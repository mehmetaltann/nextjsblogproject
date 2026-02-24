"use client";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const LoginForm = () => {
  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
      callbackUrl: "/admin",
    });

    if (response?.error) {
      toast.error("Kullanıcı bulunamadı");
      return;
    }

    if (response?.ok && response.url) {
      window.location.href = response.url;
    }
  };

  return (
    <AnimationWrapper
      keyValue="loginForm"
      className="flex flex-col items-center justify-center w-full h-screen bg-color7"
    >
      <form
        className="flex flex-col bg-white w-full md:w-2/3 lg:w-1/4 gap-5 p-[50px]"
        onSubmit={submitLogin}
      >
        <input
          required
          type="email"
          name="email"
          placeholder="Email ..."
          className="p-2.5 border-b border-gray-300"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Şifre ..."
          className="p-2.5 border-b border-gray-300"
        />
        <button
          type="submit"
          className="bg-red-700 text-white p-2.5 font-semibold"
        >
          Giriş Yap
        </button>
      </form>
    </AnimationWrapper>
  );
};

export default LoginForm;
