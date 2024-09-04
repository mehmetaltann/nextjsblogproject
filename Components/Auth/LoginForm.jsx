"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        setError("Hatalı Giriş");
        return;
      }

      router.replace("admin");
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-color7">
      <h1 className="text-xl text-[teal] border border-white px-4 py-6 rounded-lg">
        Giriş
      </h1>
      <form
        className="flex flex-col bg-[white] w-full md:w-2/3 lg:w-1/4 gap-5 p-[50px]"
        onSubmit={submitHandler}
      >
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Email ..."
          onChange={(e) => setEmail(e.target.value)}
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Şifre ..."
          onChange={(e) => setPassword(e.target.value)}
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <button
          type="submit"
          className="bg-[teal] cursor-pointer text-[white] p-2.5 border-[none]"
        >
          Giriş Yap
        </button>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
