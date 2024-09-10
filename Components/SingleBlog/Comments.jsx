"use client";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "../Layouts/Pagination";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, comments, fetchCommentData, postTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const totalComments = Math.ceil(comments?.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const displayComments = comments.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-1 w-full mt-6">
      {displayComments.map(({ _id, authorName, comment, createdAt }) => {
        return (
          <CommentItem
            key={_id}
            authorName={authorName}
            comment={comment}
            date={createdAt}
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
      <CommentForm
        postId={postId}
        postTitle={postTitle}
        fetchCommentData={fetchCommentData}
      />

      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
    </div>
  );
};

export default Comments;
