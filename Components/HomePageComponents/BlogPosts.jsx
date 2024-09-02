import BlogPostPreview from "./BlogPostPreview";

const BlogPosts = ({ menu, blogs }) => {
  return (
    <section className="grid grid-cols-1 gap-12 lg:gap-18 md:grid-cols-2 md:my-16 my-8">
      {blogs
        .filter((item) =>
          menu === "Tümü"
            ? true
            : item.category.some((insItem) => insItem.name === menu)
        )
        .map(({ cloudinaryImageId, title, description, _id, category,date }) => {
          return (
            <BlogPostPreview
              key={_id}
              id={_id}
              cloudinaryImageId={cloudinaryImageId}
              title={title}
              description={description}
              category={category}
              date={date}
            />
          );
        })}
    </section>
  );
};

export default BlogPosts;
