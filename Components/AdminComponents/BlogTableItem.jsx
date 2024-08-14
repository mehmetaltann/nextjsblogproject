"use client";
import Image from "next/image";
import { assets } from "@/Assets/assets";


const BlogTableItem = ({ title, date, deleteBlog, mongoId }) => {
  const BlogDate = new Date(date);

  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={assets.profile_icon}
          alt="author img"
          width={50}
          height={50}
        />
      </th>
      <td className="px-6 py-4">{title ? title : "Başlık Yok"}</td>
      <td className="px-6 py-4">{BlogDate.toDateString()}</td>
      <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => deleteBlog(mongoId)}
      >
        X
      </td>
    </tr>
  );
};

export default BlogTableItem;
