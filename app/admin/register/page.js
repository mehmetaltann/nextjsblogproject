"use client";
import RegisterForm from "@/Components/Admin/Register/RegisterForm";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col mt-40 mb-20 min-w-[350px]"
    >
      <RegisterForm />
    </AnimationWrapper>
  );
};

export default page;
