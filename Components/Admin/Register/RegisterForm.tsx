"use client";
import Link from "next/link";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFormState } from "react-dom"; // Bunu kontrol edin, doğru import mu?
import { userRegister } from "@/app/actions/actions";

const RegisterForm: React.FC = () => {
  const [formState, formAction] = useFormState(userRegister, null);

  useEffect(() => {
    if (formState?.isSuccess) {
      toast.success(formState?.msg);
      (document.getElementById("registerForm") as HTMLFormElement).reset();
    } else {
      toast.error(formState?.msg);
    }
  }, [formState]);

  const inputClassName =
    "p-2.5 border-b-[gray] border-[none] border-b border-solid";

  return (
    <AnimationWrapper
      keyValue="registerForm"
      className="flex flex-col m-16 md:mt-10 max-w-[410px] items-center justify-center bg-[#f9f9f9]"
    >
      <h1 className="text-xl text-[teal] mb-2 px-4 py-6 rounded-lg">
        Kayıt Formu
      </h1>
      <form
        id="registerForm"
        action={formAction}
        className="flex flex-col w-full gap-3 bg-[#f9f9f9]"
      >
        <input
          required
          type="text"
          placeholder="İsim ..."
          name="isim"
          className={inputClassName}
        />
        <input
          required
          type="email"
          placeholder="Email ..."
          name="email"
          className={inputClassName}
        />
        <input
          required
          type="password"
          placeholder="Şifre ..."
          name="password"
          className={inputClassName}
        />
        <button
          type="submit"
          className="bg-[teal] cursor-pointer text-[white] p-2.5 border-[none]"
        >
          Kayıt Ol
        </button>

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
    </AnimationWrapper>
  );
};

export default RegisterForm;
