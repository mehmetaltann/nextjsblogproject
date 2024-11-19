import Link from "next/link";
import { getFormatDate } from "@/lib/utils/helpers";
import { CldImage } from "next-cloudinary";
import { FC } from "react";
import { PostType } from "@/lib/types/types";

interface SimilarPostItemProps {
  post: PostType;
}

const SimilarPostItem: FC<SimilarPostItemProps> = ({ post }) => {
  const { _id, title, date, cloudinaryImageId } = post;

  return (
    <div className="flex-grow">
      <div className="mb-4 w-full overflow-hidden rounded-xl">
        <Link href={`/home/blog/${title}`}>
          <CldImage
            src={cloudinaryImageId}
            alt={title}
            width={420}
            height={280}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-video w-full object-cover"
            quality="auto"
            format="auto"
          />
        </Link>
      </div>
      <Link href={`/home/blog/${title}`}>
        <h3 className="text-zinc-500 font-semibold ms-1">{title}</h3>
        <p className="text-zinc-500 ms-1">{getFormatDate(date)}</p>
      </Link>
    </div>
  );
};

export default SimilarPostItem;
