import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { CommentType, PostTitle, PostType } from "@/lib/types/types";
import {
  fetchComment,
  fetchSimilarPosts,
  fetchBlog,
  fetchPostTitles,
} from "@/app/actions/fetchDatas";

interface Params {
  params: {
    title: string;
  };
}

export async function generateStaticParams() {
  const allPostTitles = (await fetchPostTitles()) as PostTitle[];
  return allPostTitles.map(({ title }) => ({
    title,
  }));
}

export async function generateMetadata({ params }: Params) {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const blog = (await fetchBlog(params.title)) as PostType;
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

    var designedDesc = description
      .replace(/(<([^>]+)>)*/g, "")
      .substring(0, 600);

    return {
      title,
      description: designedDesc,
      keywords: category.map((i: { name: string }) => i.name),
      openGraph: {
        title,
        description: designedDesc,
        url: `${siteUrl}/home/blog/${title}`,
        images: `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${cloudinaryImageId}`,
        publishedTime: date,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        images: `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${cloudinaryImageId}`,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default async function Blog({ params }: Params) {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
  const { title } = params;

  try {
    const blog = (await fetchBlog(title)) as PostType;
    const categoryArray = blog.category.map((obj) => obj.name);
    const similarPosts = (await fetchSimilarPosts(categoryArray)) as PostType[];
    const comments = (await fetchComment(blog._id)) as CommentType[];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: blog.title,
      image: `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${blog.cloudinaryImageId}`,
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
          siteUrl={siteUrl}
        />
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
