import { getFormatDate } from "@/lib/utils/helpers";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const SimilarPostItem = ({ post }) => {
  const { _id, title, date, cloudinaryImageId } = post;

  return (
    <div>
      <div className="mb-4 w-full overflow-hidden rounded-xl">
        <Link href={`/home/blog/${_id}`}>
          <CldImage
            src={cloudinaryImageId}
            alt={title}
            width={420}
            height={280}
            sizes="60vw"
            className="aspect-video w-full object-cover"
            priority={true}
          />
        </Link>
      </div>
      <Link href={`/home/blog/${_id}`}>
        <p className="text-zinc-500 font-semibold ms-1">{title}</p>
        <p className="text-zinc-500 ms-1">{getFormatDate(date)}</p>
      </Link>
    </div>
  );
};

export default SimilarPostItem;
