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

const Comments = ({ postId, postTitle, comments }: CommentsProps) => {
  const [affectedComment, setAffectedComment] =
    useState<AffectedComment | null>(null);

  const mainComments = comments?.filter(
    (item) => item.parentCommentId === null
  );

  const {
    totalPages,
    displayPosts: displayComments,
    onPageChange,
    currentPage,
  } = usePagination(mainComments, 5);

  const addCommentHandler = async (
    postData: FormData,
    parentCommentId: string | null = null
  ) => {
    try {
      await addComment({
        ...postData,
        postId,
        postTitle,
        parentCommentId,
      });
      setAffectedComment(null);
      toast.success("Yorum eklendi.");
    } catch (error) {
      toast.error("Yorum eklenemedi.");
    }
  };

  const getRepliesHandler = (commentId: string) =>
    comments.filter((c) => c.parentCommentId === commentId);

  return (
    <div className="flex flex-col gap-8 w-full">

      <CommentForm
        btnLabel="Gönder"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />

      {comments.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-zinc-900">
            Yorumlar ({mainComments?.length || 0})
          </h3>

          <div className="flex flex-col divide-y divide-zinc-200">
            {displayComments.map((comment) => (
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
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
