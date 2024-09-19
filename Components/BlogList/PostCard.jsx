import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { FaArrowRight } from "react-icons/fa6";

export default function PostCard({ data }) {
  return (
    <div className="flex flex-col gap-2">
      {data.cloudinaryImageId && (
        <Link href={`/home/blog/${data._id}`}>
          <CldImage
            src={data.cloudinaryImageId}
            alt={data.title}
            width={400}
            height={300}
            className="mb-3 h-[400px] w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            priority={true}
          />
        </Link>
      )}
      <h2 className="text-xl font-semibold tracking-tight text-zinc-800 ">
        <Link href={`/home/blog/${data._id}`}>{data.title}</Link>
      </h2>
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex select-none justify-start space-x-2 md:hidden md:justify-end">
          {data.category &&
            data.category.map((category) => (
              <div key={category.name} className="flex mt-2">
                <span className="pt-[3px] text-xs leading-none text-color9 ">
                  #{category.name}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div
        className="py-2 text-zinc-500 "
        dangerouslySetInnerHTML={{
          __html: data.description?.slice(0, 200),
        }}
      />
      <div className="flex items-center justify-between font-medium text-color9">
        <Link href={`/home/blog/${data._id}`}>
          <div className="flex items-center space-x-2">
            <span>Devamı</span>
            <FaArrowRight className="h-4 w-4 text-inherit" />
          </div>
        </Link>
        <div className="hidden select-none justify-end space-x-2 md:flex ">
          {data.category &&
            data.category.map((category) => (
              <div key={category.name} className="flex">
                <span className="pt-[3px] text-xs leading-none text-color9 ">
                  #{category.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
