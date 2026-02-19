import Link from "next/link";
import { getFormatDate } from "@/lib/utils/helpers";
import { CldImage } from "next-cloudinary";
import { PostType } from "@/lib/types/types";

interface SimilarPostItemProps {
  post: PostType;
}

const SimilarPostItem = ({ post }: SimilarPostItemProps) => {
  const { title, date, cloudinaryImageId, slug } = post;

  return (
    <article className="group flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1">
      
      <Link href={`/home/blog/${slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
          <CldImage
            src={cloudinaryImageId}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality="auto"
            format="auto"
          />
        </div>
      </Link>

      <div className="space-y-1">
        <Link href={`/home/blog/${slug}`}>
          <h3 className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-color1">
            {title}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground">
          {getFormatDate(date)}
        </p>
      </div>

    </article>
  );
};

export default SimilarPostItem;
