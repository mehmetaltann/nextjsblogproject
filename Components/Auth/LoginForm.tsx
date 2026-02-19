"use client";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const LoginForm = () => {
  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
        callbackUrl: "/",
      });

      if (response?.error) {
        toast.error("Böyle bir kullanıcı bulunmamaktadır");
        return;
      }

      if (response?.ok && response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      toast.error(
        "Bir hata oluştu: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  return (
    <AnimationWrapper
      keyValue="loginForm"
      className="flex flex-col items-center justify-center w-full h-screen bg-color7"
    >
      <form
        className="flex flex-col bg-[white] w-full md:w-2/3 lg:w-1/4 gap-5 p-[50px]"
        onSubmit={submitLogin}
      >
        <input
          required
          type="email"
          name="email"
          placeholder="Email ..."
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Şifre ..."
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <button
          type="submit"
          className="bg-red-700 cursor-pointer text-white p-2.5 border-[none] font-semibold"
        >
          Giriş Yap
        </button>
      </form>
    </AnimationWrapper>
  );
};

export default LoginForm;
