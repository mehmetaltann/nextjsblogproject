"use client";
import axios from "axios";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, comments, fetchCommentData, postTitle }) => {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!authorName || !authorEmail || !comment) {
      toast.error("Tüm Alanları Doldurunuz");
      return;
    }

    const response = await axios.post("/api/comment", {
      authorName,
      authorEmail,
      comment,
      postId,
      postTitle,
    });

    if (response.data.success) {
      toast.success(response.data.msg);
      setAuthorName("");
      setAuthorEmail("");
      setComment("");
      fetchCommentData();
    } else {
      toast.error("Bir Sıkıntı Var, Yorum Kaydedilemedi");
    }
  };

  return (
    <section className="bg-[#e9f2f2] py-8 rounded-md">
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#333]">Yorumlar</h2>

        {comments ? (
          <div className="flex flex-col gap-3">
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
          </div>
        ) : (
          <div className=" text-[#333]">Bu gönderiye henüz hiç bir youm yapılmamıştır</div>
        )}

        <form
          onSubmit={submitHandler}
          className="mt-4 bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-2 text-[#333]">Yorum Ekle</h3>
          <div className="mb-4">
            <input
              type="text"
              id="authorName"
              name="authorName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#36d1d1]"
              required
              placeholder="İsim ..."
              onChange={(e) => setAuthorName(e.target.value)}
              value={authorName}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#36d1d1]"
              required
              placeholder="Mail ... (yorumda gözükmez)"
              onChange={(e) => setAuthorEmail(e.target.value)}
              value={authorEmail}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="comment"
              name="comment"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:[#36d1d1]"
              required
              placeholder="Yorumunuz ..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#5ad6d6] text-white px-4 py-2 rounded-md hover:bg-[#36d1d1] focus:outline-none focus:ring-2 focus:[#36d1d1] focus:ring-offset-2"
          >
            Gönder
          </button>
        </form>
      </div>
    </section>
  );
};

export default Comments;
