"use client";
import BlogsTableItem from "@/Components/Admin/BlogsList/BlogsTableItem";


const BlogsTable = ({ blogs, deleteBlog }) => {
  return (
    <div className="flex-1 px-5 sm:pt-12 sm:pl-16">
      <p className="font-semibold text-center p-3 text-lg text-gray-800">Blog Yazıları</p>
      <div className="relative h-[70vh] max-w-[850px] overflow-x-auto border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-base text-gray-700 text-left bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Başlık
              </th>
              <th scope="col" className="px-6 py-3">
                Tarih
              </th>
              <th scope="col" className="px-6 py-3">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(({ title, _id, date }) => {
              return (
                <BlogsTableItem
                  key={_id}
                  mongoId={_id}
                  title={title}
                  date={date}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsTable;
