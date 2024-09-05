"use client";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, comments, fetchCommentData, postTitle }) => {
  return (
    <div className="flex flex-col gap-1 w-full mt-6">
      {comments ? (
        <>
          {comments.map(({ _id, authorName, comment, createdAt }) => {
            return (
              <CommentItem
                key={_id}
                authorName={authorName}
                comment={comment}
                date={createdAt}
              />
            );
          })}
        </>
      ) : (
        <div className=" text-[#333]">
          Bu gönderiye henüz hiç bir youm yapılmamıştır
        </div>
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
