import { assets } from "@/Assets/assets";
import Image from "next/image";

const Header = () => {
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="logo"
          className="w-[130px] sm:w-auto"
        />
        <button
          className="flex items-center gap-2 font-medium shadow-[-7px_7px_0px_#000000]
        py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black"
        >
          Get Started
          <Image src={assets.arrow} alt="get started"/>
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Son Blog Yazıları</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </p>
        <form
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border shadow-[-7px_7px_0px_#000000] border-black"
          action=""
        >
          <input
            type="email"
            placeholder="Email Adresinizi Giriniz"
            className="pl-4 outline-none"
          />
          <button type="submit" className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">
            Takip Et
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
