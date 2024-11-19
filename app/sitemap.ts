import { MetadataRoute } from "next";
import { fetchPosts } from "./actions/fetchDatas";
import { PostType } from "@/lib/types/types";

type siteMapType = {
  url: string;
  lastModified?: string | Date | undefined;
  changeFrequency?:
    | "monthly"
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "yearly"
    | "never"
    | undefined;
  priority?: number | undefined;
};

export const revalidate = 43200;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = (await fetchPosts()) as PostType[];
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const post: siteMapType[] = data.map((item: any) => ({
    url: `${siteUrl}/home/blog/${item.title.toString()}`,
    lastModified: item.updated_at || item.created_at || item.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

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
    ...post,
  ];
}
