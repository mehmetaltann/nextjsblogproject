"use client";
import moment from "moment";
import { CgProfile } from "react-icons/cg";
import "moment/locale/tr";

const CommentItem = ({ authorName, comment, date }) => {
  moment.locale("tr");
  const commentDate = moment(date).format("Do MMMM YYYY, h:mm:ss");
  const gecenZaman = moment(date).startOf("day").fromNow();
  return (
    <div className="mb-2 flex flex-col rounded-xl border border-zinc-300 p-4 pb-6 dark:border-zinc-700">
      <div className="mb-4 flex w-full flex-col md:items-center justify-between gap-2 text-gray-500 dark:text-gray-200 sm:flex-row">
        <div className="flex items-center justify-center gap-2 text-black dark:text-white">
          <CgProfile className="opacity-60 mt-1" color="blue" />
          <p className="text-lg">{authorName}</p>
        </div>
        <div className="text-xs">
          <span className="font-semibold">{gecenZaman}</span> - {commentDate}
        </div>
      </div>
      <div className="pr-6 text-zinc-700 dark:text-zinc-300">{comment}</div>
    </div>
  );
};

export default CommentItem;
