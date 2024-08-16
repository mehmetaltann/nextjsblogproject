"use client";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs, menu }) => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-y-6 lg:gap-y-10 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-12">
          {blogs
            .filter((item) =>
              menu === "Tümü"
                ? true
                : item.category.some((insItem) => insItem.name === menu)
            )
            .map(({ cloudinaryImageId, title, description, _id, category }) => {
              return (
                <BlogItem
                  key={_id}
                  id={_id}
                  cloudinaryImageId={cloudinaryImageId}
                  title={title}
                  description={description}
                  category={category}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
