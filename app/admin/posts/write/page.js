"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import AddPostPanel from "@/Components/Admin/Posts/NewPost/AddPostPanel";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="flex w-full p-6 md:w-3/4 mb-6 pb-6 md:p-0"
    >
      <AddPostPanel />
    </AnimationWrapper>
  );
};

export default page;
