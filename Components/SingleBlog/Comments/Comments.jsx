import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "../../Layouts/Pagination";
import { useParams } from "next/navigation";
import { usePagination } from "@/app/hooks/usePagination";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useComment } from "@/app/hooks/useComment";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, postTitle }) => {
  const params = useParams();
  const [affectedComment, setAffectedComment] = useState(null);

  const {
    data: comments,
    addComment,
    deleteComment,
    updateComment,
  } = useComment(params.id);

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
    const { isSuccess, resMessage } = await addComment(postData);
    toastHandler(isSuccess, resMessage);
    setAffectedComment(null);
  };

  const deleteCommentHandler = async (commentId) => {
    const { isSuccess, resMessage } = await deleteComment(commentId);
    toastHandler(isSuccess, resMessage);
    setAffectedComment(null);
  };

  const updateCommentHandler = async (value, commentId) => {
    const { isSuccess, resMessage } = await updateComment({
      content: value.content,
      _id: commentId,
    });
    toastHandler(isSuccess, resMessage);
    setAffectedComment(null);
  };

  const getRepliesHandler = (commentId) => {
    return comments.filter((comment) => comment.parentCommentId === commentId);
  };

  const toastHandler = (isSuccess, msg) => {
    if (isSuccess) {
      toast.success(msg);
    } else {
      toast.error("Bir Sıkıntı Var, İşlem Gerçekleşmedi");
    }
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
      )}
    </>
  );
};

export default Comments;
