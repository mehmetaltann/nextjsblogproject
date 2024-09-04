"use client";
import LoginForm from "@/Components/Auth/LoginForm";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <LoginForm />
    </AnimationWrapper>
  );
};

export default page;
