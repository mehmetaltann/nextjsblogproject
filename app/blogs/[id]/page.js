"use client";
import Footer from "@/Components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { assets, blog_data } from "@/Assets/assets";
import Link from "next/link";
import axios from "axios";

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="blog item image"
              width={180}
              className="w-[130px] sm:w-auto"
            />
          </Link>
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
            src={data.authorImg}
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
          <h1 className="my-8 text-[26px] font-semibold">Giriş</h1>
          <p>{data.description}</p>
          <h3 className="my-5 text-[18px] font-semibold">
            Step-1: adasdasdasdasdasd
          </h3>
          <p className="my-3">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
          <p className="my-3">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
          <h3 className="my-5 text-[18px] font-semibold">
            Step-2: adasdasdasdasdasd
          </h3>
          <p className="my-3">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
          <p className="my-3">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
          <h3 className="my-5 text-[18px] font-semibold">
            Step-3: adasdasdasdasdasd
          </h3>
          <p className="my-3">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
          <p className="my-3">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
          <div className="my-24">
            <p className="text-black font-semibold my-4">Bu Yazıyı Paylaş</p>
            <div className="flex">
              <Image src={assets.facebook_icon} width={50} alt="face icon" />
              <Image src={assets.twitter_icon} width={50} alt="twitter icon" />
              <Image
                src={assets.googleplus_icon}
                width={50}
                alt="google icon"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
