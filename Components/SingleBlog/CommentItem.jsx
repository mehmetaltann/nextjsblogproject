"use client";
import { CgProfile } from "react-icons/cg";
import { getFormatLeftTime, getFormatLongDate } from "@/lib/utils/helpers";

const CommentItem = ({ authorName, comment, date }) => {
  return (
    <div className="mb-2 flex flex-col rounded-xl border border-zinc-300 p-4 pb-6 ">
      <div className="mb-4 flex w-full flex-col md:items-center justify-between gap-2 text-gray-500  sm:flex-row">
        <div className="flex items-center justify-center gap-2 text-black ">
          <CgProfile className="opacity-60 mt-1 text-color9" />
          <p className="text-lg">{authorName}</p>
        </div>
        <div className="text-xs">
          <span className="font-semibold">{getFormatLeftTime(date)}</span> - {" "}
          {getFormatLongDate(date)}
        </div>
      </div>
      <div className="pr-6 text-zinc-700 dark:text-zinc-300">{comment}</div>
    </div>
  );
};

export default CommentItem;
