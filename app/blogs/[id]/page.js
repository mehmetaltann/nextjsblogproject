"use client";
import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = () => {
    for (const item of blog_data) {
      if (Number(params.id) === item.id) {
        setData(item);
        break;
      }
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Image
            src={assets.logo}
            alt="blog item image"
            width={180}
            className="w-[130px] sm:w-auto"
          />
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image src={assets.arrow} alt="blog get started" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.author_img}
            alt="author Image"
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
          <Image
            src={data.image}
            alt="blog Image"
            width={1280}
            height={720}
            className="border-4 border-white"
          />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default page;
