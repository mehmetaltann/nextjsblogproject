"use client";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "../../Layouts/Pagination";
import axios from "axios";
import { usePagination } from "@/store/usePagination";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, comments, fetchCommentData, postTitle }) => {
  const [affectedComment, setAffectedComment] = useState(null);
  const mainComments = comments.filter((item) => item.parentCommentId === null);

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

    const response = await axios.post("/api/comment", postData);
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchCommentData();
    } else {
      toast.error("Bir Sıkıntı Var, Yorum Kaydedilemedi");
    }
    setAffectedComment(null);
  };

  const deleteCommentHandler = async (commentId) => {
    const response = await axios.delete(`/api/comment`, {
      params: {
        id: commentId,
      },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchCommentData();
    } else {
      toast.error("İşlem Gerçekleşmedi");
    }
    setAffectedComment(null);
  };

  const updateCommentHandler = async (value, commentId) => {
    const updateData = { content: value.content, _id: commentId };
    const response = await axios.put("/api/comment", updateData);
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchCommentData();
    } else {
      toast.error("Bir Sıkıntı Var, Yorum Kaydedilemedi");
    }
    setAffectedComment(null);
  };

  const getRepliesHandler = (commentId) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  return (
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
                updateCommentHandler={updateCommentHandler}
                deleteCommentHandler={deleteCommentHandler}
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
