import Link from "next/link";
import parse from "html-react-parser";
import { ClientContext } from "@/store/ClientContext";
import { CldImage } from "next-cloudinary";
import { useContext } from "react";
import { getFormatDate } from "@/lib/utils/helpers";
import { PostType } from "@/lib/types/types";

interface BlogPostPreviewProps {
  post: PostType;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ post }) => {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );
  }

  const { setSelectedCategory } = context;

  return (
    <div className="break-words">
      <Link href={`/home/blog/${post._id}`}>
        <div className="aspect-[16/9] relative">
          <CldImage
            src={post.cloudinaryImageId}
            alt={post.title}
            className="object-cover rounded-lg"
            priority={true}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
        <h2 className="font-semibold tracking-tighter text-primary-txt text-2xl md:text-3xl">
          <Link href={`/home/blog/${post._id}`}>{post.title}</Link>
        </h2>
        <div className="prose lg:prose-lg italic tracking-tighter text-muted-foreground">
          {getFormatDate(post.date)}
        </div>
        <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
          {parse(post.description)}
        </div>
        <div className="text-sm text-muted-foreground">
          {post.category.map((cat, index) => (
            <div
              key={index}
              className="mr-2 inline-block cursor-pointer hover:text-color1"
            >
              <Link
                href={`/home/bloglist`}
                onClick={() => setSelectedCategory(cat.name)}
                aria-label={`Filter posts by category ${cat.name}`}
              >
                #{cat.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPreview;
