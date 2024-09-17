"use client";
import ManagePost from "@/Components/Admin/Dashboard/ManagePost";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <ManagePost />
    </AnimationWrapper>
  );
};

export default page;
