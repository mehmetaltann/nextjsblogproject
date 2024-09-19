"use client";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "../../Layouts/Pagination";
import { usePagination } from "@/app/hooks/usePagination";
import { useState } from "react";
import { addComment } from "@/app/actions/actions";
import { toast } from "react-toastify";

const Comments = ({ postId, postTitle, comments }) => {
  const [affectedComment, setAffectedComment] = useState(null);

  const mainComments = comments?.filter(
    (item) => item.parentCommentId === null
  );

  //Pagination
  const {
    totalPages: totalComments,
    displayPosts: displayComments,
    onPageChange,
    currentPage,
  } = usePagination(mainComments, 5);

  const addCommentHandler = async (postData, parentCommentId = null) => {
    postData.postId = postId;
    postData.postTitle = postTitle;
    postData.parentCommentId = parentCommentId;
    await addComment(postData);
    setAffectedComment(null);
  };

  const getRepliesHandler = (commentId) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  return (
    <>
      {comments && (
        <div className="flex flex-col gap-1 w-full mt-6">
          <CommentForm
            btnLabel="Gönder"
            formSubmitHandler={(value) => addCommentHandler(value)}
          />
          {mainComments.length > 0 && (
            <>
              <p className="font-semibold text-xl py-2 opacity-80 text-color1">
                Tüm Yorumlar ({mainComments.length})
              </p>
              {displayComments.map((comment) => {
                return (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    affectedComment={affectedComment}
                    setAffectedComment={setAffectedComment}
                    addCommentHandler={addCommentHandler}
                    replies={getRepliesHandler(comment._id)}
                  />
                );
              })}
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
      )}
    </>
  );
};

export default Comments;
