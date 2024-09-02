import React from "react";
import moment from "moment";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import "moment/locale/tr";

const CommentItem = ({ authorName, comment, date }) => {
  moment.locale("tr");
  const commentDate = moment(date).format("Do MMMM YYYY, h:mm:ss");
  const gecenZaman = moment(date).startOf("day").fromNow();
  return (
    <div className="mb-2 flex flex-col rounded-xl border border-zinc-300 p-4 pb-6 dark:border-zinc-700">
      <div className="mb-4 flex w-full flex-col md:items-center justify-between gap-2 text-gray-500 dark:text-gray-200 sm:flex-row">
        <div className="flex items-center gap-2 text-black dark:text-white">
          <Image
            src={assets.author}
            width={25}
            alt="authorImage"
            id="avatarButton"
            className="h-4 w-4"
          />
          <div className="text-lg">{authorName}</div>
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
