import React from "react";
import CommentForm from "./CommentForm";
import { CgProfile } from "react-icons/cg";
import { getFormatLeftTime, getFormatLongDate } from "@/lib/utils/helpers";
import { useSession } from "next-auth/react";
import { FiMessageSquare, FiTrash, FiEdit2 } from "react-icons/fi";
import { updateComment, deleteComment } from "@/app/actions/actions";
import { toast } from "react-toastify";
import { CommentType } from "@/lib/types/types";

interface AffectedComment {
  type: "replying" | "editing";
  _id: string;
}

interface FormData {
  authorName: string;
  authorEmail: string;
  content: string;
}

interface CommentItemProps {
  comment: CommentType;
  affectedComment: AffectedComment | null;
  setAffectedComment: React.Dispatch<
    React.SetStateAction<AffectedComment | null>
  >;
  addCommentHandler: (
    value: FormData,
    parentCommentId?: string | null
  ) => Promise<void>;
  parentId?: string | null;
  replies: CommentType[];
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  affectedComment,
  setAffectedComment,
  addCommentHandler,
  parentId = null,
  replies,
}) => {
  const {
    authorName,
    content,
    date,
    _id,
    parentCommentId: parent,
    postId,
  } = comment;
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

  const handleAffectedComment = (type: "replying" | "editing") => {
    if (affectedComment === null) {
      setAffectedComment({ type, _id });
    } else {
      setAffectedComment(null);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteComment(_id, postId);
      setAffectedComment(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-2 flex flex-col rounded-xl border border-color7 p-4 pb-6 ">
      <div className="mb-4 flex w-full flex-col md:items-center justify-between gap-2 text-gray-500 sm:flex-row">
        <div className="flex items-center gap-2 opacity-80 text-black">
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
          btnLabel="Güncelle"
          formSubmitHandler={async (value: FormData) => {
            const { msg } = await updateComment({
              content: value.content,
              _id,
            },postId);
            setAffectedComment(null);
            toast.success(msg);
          }}
          formCancelHandler={() => handleAffectedComment("editing")}
          initialText={content}
        />
      )}
      <div className="flex items-center gap-x-4 font-roboto text-color9 text-sm mt-3 opacity-80">
        {!parent && (
          <button
            className="flex items-center space-x-2"
            onClick={() => handleAffectedComment("replying")}
          >
            <FiMessageSquare className="w-4 h-auto" />
            <span>Yanıtla</span>
          </button>
        )}
        {session && (
          <>
            <button
              className="flex items-center space-x-2"
              onClick={() => handleAffectedComment("editing")}
            >
              <FiEdit2 className="w-4 h-auto" />
              <span>Güncelle</span>
            </button>
            <button
              className="flex items-center space-x-2"
              onClick={handleDeleteClick}
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
          formSubmitHandler={(value: FormData) =>
            addCommentHandler(value, parentCommentId)
          }
          formCancelHandler={() => handleAffectedComment("replying")}
        />
      )}
      {replies?.length > 0 && (
        <div className="mt-6 ms-6 md:ms-24">
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addCommentHandler={addCommentHandler}
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
