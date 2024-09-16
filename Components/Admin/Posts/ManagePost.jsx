"use client";
import Pagination from "@/Components/Layouts/Pagination";
import { usePagination } from "@/app/hooks/usePagination";
import { usePosts } from "@/app/hooks/usePosts";
import { Loader } from "@/Components/Layouts/Loader";
import { getFormatDate } from "@/lib/utils/helpers";
import { CldImage } from "next-cloudinary";

const tableHeads = ["Başlık", "Kategoriler", "Tarih", "Ana Sayfa", "İşlemler"];

const ManagePost = () => {
  const { blogs: allPosts, isLoading, error } = usePosts();

  //Pagination
  const { totalPages, displayPosts, onPageChange, currentPage, deletePost } =
    usePagination(allPosts, 5, isLoading);

  return (
    <>
      <h1 className="font-semibold text-2xl">Post Yönetimi</h1>
      {isLoading && <Loader />}
      {error && <div>failed to load</div>}
      {!isLoading && !error && (
        <div className="w-full px-4 mx-auto">
          <div className="py-8">
            <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
              <h2 className="text-2xl leading-tight">Yazılar</h2>
              <div className="text-end">
                <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                  <div className=" relative ">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="name"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Filter
                  </button>
                </form>
              </div>
            </div>
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      {tableHeads.map((item) => (
                        <th
                          key={item}
                          scope="col"
                          className="px-5 py-3 font-semibold text-sm text-left text-gray-800 bg-white border-b border-gray-200"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayPosts?.map((post) => (
                      <tr key={post._id}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <CldImage
                                src={post.cloudinaryImageId}
                                alt={post.title}
                                width={90}
                                height={60}
                                className="aspect-video w-full object-cover rounded-xl"
                                priority={true}
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex flex-wrap gap-2 text-gray-900 whitespace-no-wrap">
                            {post.category.map((cat) => (
                              <span>#{cat.name}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {getFormatDate(post.date)}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative"> {post.isHome}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagePost;
