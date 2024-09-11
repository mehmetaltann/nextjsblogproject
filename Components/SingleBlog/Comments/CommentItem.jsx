"use client";
import CommentForm from "./CommentForm";
import { CgProfile } from "react-icons/cg";
import { getFormatLeftTime, getFormatLongDate } from "@/lib/utils/helpers";
import { useSession } from "next-auth/react";
import { FiMessageSquare, FiTrash, FiEdit2 } from "react-icons/fi";

const CommentItem = ({
  comment,
  affectedComment,
  setAffectedComment,
  addCommentHandler,
  parentId = null,
  updateCommentHandler,
  deleteCommentHandler,
  replies,
}) => {
  const { authorName, content, date, _id } = comment;
  const isReplying =
    affectedComment &&
    affectedComment._id === _id &&
    affectedComment.type === "replying";
  const isEditing =
    affectedComment &&
    affectedComment._id === _id &&
    affectedComment.type === "editing";
  const parentCommentId = parentId ? parentId : _id;

  const { data: session } = useSession();
  return (
    <div className="mb-2 flex flex-col rounded-xl border border-color7 p-4 pb-6 ">
      <div className="mb-4 flex w-full flex-col md:items-center justify-between gap-2 text-gray-500  sm:flex-row">
        <div className="flex items-center gap-2 opacity-80 text-black ">
          <CgProfile className="text-color9" />
          <p className="text-lg">{authorName}</p>
        </div>
        <div className="text-xs">
          <span className="font-semibold">{getFormatLeftTime(date)}</span> -{" "}
          {getFormatLongDate(date)}
        </div>
      </div>
      {!isEditing && <div className="pr-6 text-zinc-700">{content}</div>}

      {isEditing && (
        <CommentForm
          btnLabel="Düzenle"
          formSubmitHandler={(value) => updateCommentHandler(value, _id)}
          formCancelHandler={() => setAffectedComment(null)}
          initialText={content}
        />
      )}
      <div className="flex items-center gap-x-4 font-roboto text-color9 text-sm mt-3 opacity-80">
        <button
          className="flex items-center space-x-2"
          onClick={() => setAffectedComment({ type: "replying", _id })}
        >
          <FiMessageSquare className="w-4 h-auto" />
          <span>Yanıtla</span>
        </button>
        {session && (
          <>
            <button
              className="flex items-center space-x-2"
              onClick={() => setAffectedComment({ type: "editing", _id })}
            >
              <FiEdit2 className="w-4 h-auto" />
              <span>Güncelle</span>
            </button>
            <button
              className="flex items-center space-x-2"
              onClick={() => deleteCommentHandler(_id)}
            >
              <FiTrash className="w-4 h-auto" />
              <span>Sil</span>
            </button>
          </>
        )}
      </div>
      {isReplying && (
        <CommentForm
          btnLabel="Yanıtla"
          formSubmitHandler={(value) =>
            addCommentHandler(value, parentCommentId)
          }
          formCancelHandler={() => setAffectedComment(null)}
        />
      )}
      {replies.length > 0 && (
        <div className="mt-6 ms-24">
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addCommentHandler={addCommentHandler}
              updateCommentHandler={updateCommentHandler}
              deleteCommentHandler={deleteCommentHandler}
              replies={[]}
              parentId={comment._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;