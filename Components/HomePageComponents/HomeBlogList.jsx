"use client";
import HomeBlogItem from "./HomeBlogItem";

const HomeBlogList = ({ blogs, menu }) => {
  return (
    <section className="flex flex-col gap-[150px] mt-[50px] w-2/3 mb-8">
      {blogs
        .filter((item) =>
          menu === "Tümü"
            ? true
            : item.category.some((insItem) => insItem.name === menu)
        )
        .map(({ cloudinaryImageId, title, description, _id, category }) => {
          return (
            <HomeBlogItem
              key={_id}
              id={_id}
              cloudinaryImageId={cloudinaryImageId}
              title={title}
              description={description}
              category={category}
            />
          );
        })}
    </section>
  );
};

export default HomeBlogList;
