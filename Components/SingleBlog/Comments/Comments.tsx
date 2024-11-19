"use client";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "../../Layouts/Pagination";
import { usePagination } from "@/lib/hooks/usePagination";
import { useState } from "react";
import { addComment } from "@/app/actions/actions";
import { toast } from "react-toastify";
import { CommentType } from "@/lib/types/types";

interface FormData {
  authorName: string;
  authorEmail: string;
  content: string;
}

interface CommentsProps {
  postId: string;
  postTitle: string;
  comments: CommentType[];
}

interface AffectedComment {
  type: "replying" | "editing";
  _id: string;
}

const Comments: React.FC<CommentsProps> = ({ postId, postTitle, comments }) => {
  const [affectedComment, setAffectedComment] =
    useState<AffectedComment | null>(null);

  const mainComments = comments?.filter(
    (item) => item.parentCommentId === null
  );

  const {
    totalPages: totalComments,
    displayPosts: displayComments,
    onPageChange,
    currentPage,
  } = usePagination(mainComments, 5);

  const addCommentHandler = async (
    postData: FormData,
    parentCommentId: string | null = null
  ) => {
    try {
      const commentData = {
        ...postData,
        postId,
        postTitle,
        parentCommentId,
      };
      await addComment(commentData);
      setAffectedComment(null);
      toast.success("Yorum başarıyla eklendi!");
    } catch (error) {
      console.error(error);
      toast.error("Yorum eklenirken bir hata oluştu.");
    }
  };

  const getRepliesHandler = (commentId: string) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  return (
    <div className="flex flex-col gap-1 w-full mt-6">
      <CommentForm
        btnLabel="Gönder"
        formSubmitHandler={(value: FormData) => addCommentHandler(value)}
      />
      {comments.length > 0 && (
        <>
          <p className="font-semibold text-xl py-2 opacity-80 text-color1">
            Tüm Yorumlar ({mainComments?.length || 0})
          </p>
          {displayComments.map((comment: CommentType) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addCommentHandler={addCommentHandler}
              replies={getRepliesHandler(comment._id)}
              postTitle={postTitle}
            />
          ))}
          {totalComments > 1 && (
            <Pagination
              totalPages={totalComments}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
