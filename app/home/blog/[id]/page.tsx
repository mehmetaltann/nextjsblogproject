import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import BlogModel from "@/lib/models/BlogModel";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import {
  fetchComment,
  fetchSimilarPosts,
  fetchBlog,
} from "@/app/actions/fetchDatas";
import { CommentType, PostType } from "@/lib/types/types";

// Tip tanımları
interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const siteUrl = process.env.BASE_URL as string;
  const id = params.id;

  try {
    const blog = await fetchBlog(id);

    if (!blog) {
      return {
        title: "Yazı bulunamadı",
        description: "The post you are looking for does not exist.",
        keywords: [],
        openGraph: {
          title: "Yazı bulunamadı",
          description: "The post you are looking for does not exist.",
          url: "",
          images: "",
          publishedTime: new Date(),
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: "Yazı bulunamadı",
          images: "",
        },
      };
    }

    const { title, description, cloudinaryImageId, category, date } = blog;

    return {
      title,
      description,
      keywords: category.map((i: { name: string }) => i.name),
      openGraph: {
        title,
        description,
        url: `${siteUrl}/home/blog/${id}`,
        images: `${process.env.CLOUDINARY_BASE_URL}/${cloudinaryImageId}`,
        publishedTime: date,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        images: `${process.env.CLOUDINARY_BASE_URL}/${cloudinaryImageId}`,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default async function Blog({ params }: Params) {
  const { id } = params;

  try {
    const blog = (await fetchBlog(id)) as PostType;
    const categoryArray = blog.category.map((obj) => obj.name);
    const similarPosts = (await fetchSimilarPosts(categoryArray)) as PostType[];
    const comments = (await fetchComment(id)) as CommentType[];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: blog.title,
      image: `${process.env.CLOUDINARY_BASE_URL}/${blog.cloudinaryImageId}`,
      description: blog.description,
      author: { "@type": "Person", name: "Mehmet ALTAN" },
      datePublished: blog.updated_at || blog.date,
    };

    return (
      <Suspense fallback={<Loader />}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SingleBlog
          blog={blog}
          sameCategoryBlogs={similarPosts}
          comments={comments}
        />
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
