import React from "react";
import CommentForm from "./CommentForm";
import { CgProfile } from "react-icons/cg";
import { getFormatLeftTime } from "@/lib/utils/helpers";
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
  postTitle: string;
}

const CommentItem = ({
  comment,
  affectedComment,
  setAffectedComment,
  addCommentHandler,
  parentId = null,
  replies,
  postTitle,
}: CommentItemProps) => {
  const { authorName, content, date, _id, parentCommentId } = comment;
  const { data: session } = useSession();

  const isReplying =
    affectedComment?._id === _id && affectedComment.type === "replying";
  const isEditing =
    affectedComment?._id === _id && affectedComment.type === "editing";

  const handleAffectedComment = (type: "replying" | "editing") => {
    setAffectedComment(
      affectedComment?._id === _id ? null : { type, _id }
    );
  };

  const handleDeleteClick = async () => {
    try {
      await deleteComment(_id, postTitle);
      setAffectedComment(null);
    } catch (error) {
      toast.error("Silinemedi.");
    }
  };

  return (
    <div className="py-6">

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-zinc-900">
          <CgProfile className="text-zinc-400" />
          {authorName}
        </div>
        <span>{getFormatLeftTime(date)}</span>
      </div>

      {!isEditing && (
        <div className="mt-3 text-zinc-700 leading-relaxed">
          {content}
        </div>
      )}

      {isEditing && (
        <CommentForm
          btnLabel="Güncelle"
          formSubmitHandler={async (value) => {
            const res = await updateComment(
              { content: value.content, _id },
              postTitle
            );
            toast.success(res?.msg);
            setAffectedComment(null);
          }}
          formCancelHandler={() => handleAffectedComment("editing")}
          initialText={content}
        />
      )}

      <div className="flex items-center gap-5 text-sm text-muted-foreground mt-4">
        {!parentCommentId && (
          <button
            onClick={() => handleAffectedComment("replying")}
            className="flex items-center gap-2 hover:text-zinc-900 transition"
          >
            <FiMessageSquare size={16} />
            Yanıtla
          </button>
        )}

        {session && (
          <>
            <button
              onClick={() => handleAffectedComment("editing")}
              className="flex items-center gap-2 hover:text-zinc-900 transition"
            >
              <FiEdit2 size={16} />
              Güncelle
            </button>

            <button
              onClick={handleDeleteClick}
              className="flex items-center gap-2 hover:text-red-600 transition"
            >
              <FiTrash size={16} />
              Sil
            </button>
          </>
        )}
      </div>

      {isReplying && (
        <div className="mt-4">
          <CommentForm
            btnLabel="Yanıtla"
            formSubmitHandler={(value) =>
              addCommentHandler(value, parentId || _id)
            }
            formCancelHandler={() => handleAffectedComment("replying")}
          />
        </div>
      )}

      {replies?.length > 0 && (
        <div className="mt-6 ml-6 md:ml-10 border-l border-zinc-200 pl-6">
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addCommentHandler={addCommentHandler}
              replies={[]}
              parentId={_id}
              postTitle={postTitle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
