import { connectToMongoDB } from "@/lib/config/db";
import { MetadataRoute } from "next";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = await connectToMongoDB();
  const data = await client.collection("blogs").find({}).toArray();
  const siteUrl = process.env.BASE_URL as string;

  const post: siteMapType[] = data.map((item) => ({
    url: `${siteUrl}/home/blog/${item._id.toString()}`,
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
