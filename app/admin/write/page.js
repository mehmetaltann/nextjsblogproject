"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import AddPostPanel from "@/Components/Admin/Write/AddPostPanel";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="flex w-full md:w-2/3 p-6 mb-6 pb-6 md:p-0 items-center justify-center"
    >
      <AddPostPanel />
    </AnimationWrapper>
  );
};

export default page;
