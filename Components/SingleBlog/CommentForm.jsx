"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentForm = ({ postId, postTitle, fetchCommentData }) => {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!authorName || !authorEmail || !comment) {
      toast.error("Tüm Alanları Doldurunuz");
      return;
    }

    console.log({
      authorName,
      authorEmail,
      comment,
      postId,
      postTitle,
    });

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
    <>
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
      <form
        onSubmit={submitHandler}
        className="mb-2 flex flex-col rounded-xl border border-zinc-300 p-4 pb-6 dark:border-zinc-700"
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
          className="text-color3 px-4 py-2 border border-color1/70 rounded-md hover:bg-color3 hover:text-white focus:outline-none focus:ring-2 focus:[#36d1d1] focus:ring-offset-2"
        >
          Gönder
        </button>
      </form>
    </>
  );
};

export default CommentForm;
