import BlogItem from "./BlogItem";
import { blog_data } from "@/Assets/assets";
import { useState } from "react";

const BlogList = () => {
  const [menu, setMenu] = useState("Tümü");

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("Tümü")}
          className={
            menu === "Tümü" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Tümü
        </button>
        <button
          onClick={() => setMenu("Teknoloji")}
          className={
            menu === "Teknoloji"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Teknoloji
        </button>
        <button
          onClick={() => setMenu("Yaşam")}
          className={
            menu === "Yaşam" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Yaşam
        </button>
        <button
          onClick={() => setMenu("Tatil")}
          className={
            menu === "Tatil" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Tatil
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blog_data
          .filter((item) => (menu === "Tümü" ? true : item.category === menu))
          .map(({ image, title, description, id, category }, index) => {
            return (
              <BlogItem
                key={index}
                id={id}
                image={image}
                title={title}
                description={description}
                category={category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
