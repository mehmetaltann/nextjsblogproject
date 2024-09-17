"use client";
import RegisterForm from "@/Components/Admin/Register/RegisterForm";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col m-16 md:mt-10 max-w-[410px] items-center justify-center bg-[#f9f9f9]"
    >
      <RegisterForm />
    </AnimationWrapper>
  );
};

export default page;
