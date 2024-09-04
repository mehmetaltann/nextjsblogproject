"use client";
import WriteForm from "@/Components/Admin/Write/WriteForm";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="flex w-full items-center justify-center"
    >
      <WriteForm />
    </AnimationWrapper>
  );
};

export default page;
