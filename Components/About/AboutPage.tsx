"use client";
import AnimationWrapper from "../Layouts/AnimationWrapper";
import AboutPhoto from "./AboutPhoto";
import AboutSocials from "./AboutSocials";
import parse from "html-react-parser";

const AboutPage = ({ content }: { content: string }) => {
  return (
    <AnimationWrapper keyValue="aboutPage" className="w-full">
      <section className="h-full">
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center mx-auto justify-around xl:pt-8 xl:pb-24">
            <div className="text-center order-2 xl:order-none">
              <h1 className="h1 mb-6 text-xl">
                Merhaba Ben{" "}
                <span className="text-color1 text-xl">Mehmet ALTAN</span>
                <br />
              </h1>

              <h6 className="max-w-[1000px] mb-9 text-black/80 text-sm">
                {parse(content)}
              </h6>

              <div className="mb-8 xl:mb-0 ">
                <AboutSocials
                  containerStyles="flex gap-4 items-center justify-center"
                  iconStyles="w-9 h-9 border border-color7 rounded-full flex justify-center items-center text-color1  hover:bg-color1 hover:text-white hover:transition-all duration-500"
                />
              </div>
            </div>
            <div className="order-1 xl:order-none mb-8 xl-mb-0">
              <AboutPhoto />
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AboutPage;
