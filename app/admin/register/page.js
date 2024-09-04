"use client";
import RegisterForm from "@/Components/Admin/Register/RegisterForm";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type} className="flex flex-col items-center justify-center w-full h-screen bg-color7">
      <RegisterForm />
    </AnimationWrapper>
  );
};

export default page;
