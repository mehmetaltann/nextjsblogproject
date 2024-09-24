import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import BlogModel from "@/lib/models/BlogModel";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import {
  fetchComment,
  fetchBlogAndSimilarPosts,
} from "@/app/actions/fetchDatas";

export async function generateMetadata({ params }) {
  const siteUrl = process.env.BASE_URL;
  const id = params.id;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return {
        title: "Yazı bulunamadı",
        description: "The post you are looking for does not exist.",
      };
    }

    const {
      title,
      description,
      cloudinaryImageId,
      category,
      date,
      updated_at,
    } = blog;

    return {
      title,
      description,
      keywords: category.map((i) => i.name),
      openGraph: {
        title,
        description,
        url: `${siteUrl}/home/blog/${id}`,
        images: `${process.env.CLOUDINARY_BASE_URL}/${cloudinaryImageId}`,
        publishedTime: updated_at || date,
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

const cachedFetchCommentData = unstable_cache(fetchComment, (id) => [id], {
  revalidate: 120,
  tags: ["comments"],
});

export default async function Blog({ params }) {
  const { id } = params;
  const { blog, sameCategoryBlogs } = await fetchBlogAndSimilarPosts(id);
  const comments = await cachedFetchCommentData(id);

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
        sameCategoryBlogs={sameCategoryBlogs}
        comments={comments}
      />
    </Suspense>
  );
}
