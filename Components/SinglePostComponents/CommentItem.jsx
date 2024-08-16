"use client";
import moment from "moment";
import "moment/locale/tr";

const CommentItem = ({ authorName, comment, date }) => {
  moment.locale("tr");
  const commentDate = moment(date).format("Do MMMM YYYY, h:mm:ss");
  const gecenZaman = moment(date).startOf("day").fromNow();

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <div>
            <h3 className="font-semibold text-[#333]">{authorName}</h3>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">{gecenZaman}</span> -{" "}
              {commentDate}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
