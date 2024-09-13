"use client";
import CategoryForm from "@/Components/Admin/Category/CategoryForm";
import CategoryTable from "@/Components/Admin/Category/CategoryTable";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col gap-1 w-full md:w-2/4 sm:pt-12 sm:pl-17"
    >
      <CategoryForm />
      <CategoryTable />
    </AnimationWrapper>
  );
};

export default page;
