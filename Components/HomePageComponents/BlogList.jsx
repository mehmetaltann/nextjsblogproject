"use client";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs, menu }) => {
  return (
    <div className="flex flex-wrap justify-center gap-7 gap-y-10 mb-16 xl:mx-24">
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
  );
};

export default BlogList;
