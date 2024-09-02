"use client";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, comments, fetchCommentData, postTitle }) => {
  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
      <h2 className="mb-4 text-2xl">Yorumlar</h2>
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
    </div>
  );
};

export default Comments;
