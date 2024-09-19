import BlogModel from "@/lib/models/BlogModel";

export async function generateMetadata({ params }) {
  const id = params.id;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return {
        title: "Yazı bulunamadı",
        description: "The post you are looking for does not exist.",
      };
    }

    const { title, description, cloudinaryImageId, category, date } = blog;

    return {
      title,
      description,
      keywords: category.map((i) => i.name),
      openGraph: {
        title,
        description,
        url: `http://localhost:3000/home/blog/${id}`,
        images: cloudinaryImageId,
      },
      twitter: {
        card: "summary_large_image",
        title,
        images: cloudinaryImageId,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Layout({ children }) {
  return <>{children}</>;
}
