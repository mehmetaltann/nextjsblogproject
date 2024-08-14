"use client";
import axios from "axios";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, comments, fetchCommentData }) => {
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
    <section className="bg-gray-100 py-8">
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Yorumlar</h2>

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
          <div>Henüz Hiç Bir Youm Yapılmamıştır</div>
        )}

        <form
          onSubmit={submitHandler}
          className="mt-4 bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Yorum Ekle</h3>
          <div className="mb-4">
            <input
              type="text"
              id="authorName"
              name="authorName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Mail ... (gözükmeyecek)"
              onChange={(e) => setAuthorEmail(e.target.value)}
              value={authorEmail}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="comment"
              name="comment"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Yorumunuz ..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Gönder
          </button>
        </form>
      </div>
    </section>
  );
};

export default Comments;
