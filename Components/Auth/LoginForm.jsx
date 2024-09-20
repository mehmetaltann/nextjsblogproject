"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();

  const submitLogin = async (formData) => {
    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (response.error) {
        toast.error("Böyle bir kullanıcı bulunmamaktadır");
        return;
      }

      router.replace("admin");
    } catch (error) {
      toast.error("Böyle bir kullanıcı bulunmamaktadır" + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-color7">
      <form
        className="flex flex-col bg-[white] w-full md:w-2/3 lg:w-1/4 gap-5 p-[50px]"
        action={submitLogin}
      >
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Email ..."
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Şifre ..."
          className="p-2.5 border-b-[gray] border-[none] border-b border-solid"
        />
        <button
          type="submit"
          className="bg-color7 cursor-pointer text-color8 p-2.5 border-[none] font-semibold"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
