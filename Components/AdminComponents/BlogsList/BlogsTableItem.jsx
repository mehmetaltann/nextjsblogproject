"use client";
import moment from "moment";
import "moment/locale/tr";

const BlogsTableItem = ({ title, date, deleteBlog, mongoId }) => {
  const blogDate = moment(date).format("Do MMMM YYYY");

  return (
    <tr className="bg-white border-b ">
      <td className="px-6 py-4">{title ? title : "Başlık Yok"}</td>
      <td className="px-6 py-4 ">{blogDate}</td>
      <td
        className="px-6 py-4 cursor-pointer text-center"
        onClick={() => deleteBlog(mongoId)}
      >
        X
      </td>
    </tr>
  );
};

export default BlogsTableItem;
