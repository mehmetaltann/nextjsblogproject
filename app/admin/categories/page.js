"use client";
import CategoryForm from "@/Components/Admin/Category/CategoryForm";
import CategoryTable from "@/Components/Admin/Category/CategoryTable";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col gap-1 w-full md:w-2/6 sm:pt-12 sm:pl-17"
    >
      <h1 className="font-semibold text-2xl top-0">Kategori Yönetimi</h1>
      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <CategoryForm />
          <CategoryTable />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default page;
