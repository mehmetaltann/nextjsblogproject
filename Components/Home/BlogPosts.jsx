"use client";
import BlogPostPreview from "./BlogPostPreview";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const BlogPosts = ({ blogs, type }) => {
  return (
    <section className="grid grid-cols-1 gap-12 lg:gap-18 md:grid-cols-2 md:my-16 my-8">
      {blogs.map(
        ({ cloudinaryImageId, title, description, _id, category, date }) => {
          return (
            <AnimationWrapper key={_id} keyValue={type}>
              <BlogPostPreview
                id={_id}
                cloudinaryImageId={cloudinaryImageId}
                title={title}
                description={description}
                category={category}
                date={date}
              />
            </AnimationWrapper>
          );
        }
      )}
    </section>
  );
};

export default BlogPosts;
