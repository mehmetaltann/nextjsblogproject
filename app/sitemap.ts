import { MetadataRoute } from "next";
import { fetchPosts } from "./actions/fetchDatas";
import { PostType, SiteMapItem } from "@/lib/types/types";
import { slugify } from "@/lib/utils/helpers";

export const revalidate = 43200;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://altans.com.tr";
  const posts = (await fetchPosts()) as PostType[];

  const postUrls: SiteMapItem[] = posts.map((post) => {
    const slug = slugify(post.title);
    return {
      url: encodeURI(`${siteUrl}/home/blog/${slug}`),
      lastModified: post.updatedAt || post.createdAt || post.date,
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/home`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/home/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/home/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/home/bloglist`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...postUrls,
  ];
}
