import Link from "next/link";
import dynamic from "next/dynamic";
import { CldImage } from "next-cloudinary";
import { FaArrowRight } from "react-icons/fa6";
import { HomePost } from "@/lib/types/types";

const RenderHTML = dynamic(() => import("../ui/RenderHTML"), {
  ssr: false,
});

interface PostCardProps {
  data: HomePost;
}

export default function PostCard({ data }: PostCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {data.cloudinaryImageId && (
        <Link href={`/home/blog/${data.slug}`} className="block">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
            <CldImage
              src={data.cloudinaryImageId}
              alt={data.title}
              fill
              className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={false}
            />
          </div>
        </Link>
      )}

      <h2 className="text-lg font-semibold tracking-tight text-zinc-800">
        <Link
          href={`/home/blog/${data.slug}`}
          className="hover:text-color10 transition-colors"
        >
          {data.title}
        </Link>
      </h2>

      <RenderHTML HTML={data.description} />

      <div className="flex items-center justify-between text-sm font-medium text-color9">
        <Link
          href={`/home/blog/${data.slug}`}
          className="flex items-center gap-2 hover:text-color10 transition-colors"
        >
          <span>Devamı</span>
          <FaArrowRight className="h-4 w-4" />
        </Link>

        <div className="flex flex-wrap gap-2">
          {data.category &&
            data.category.map((category) => (
              <span key={category.name} className="text-xs text-gray-500">
                #{category.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
