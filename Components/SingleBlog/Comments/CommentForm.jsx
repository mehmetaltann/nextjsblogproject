"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const CommentForm = ({
  formSubmitHandler,
  btnLabel,
  formCancelHandler = null,
  initialText = "",
}) => {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();

    if (btnLabel !== "Düzenle") {
      if (!authorName || !authorEmail || !content) {
        toast.error("Tüm Alanları Doldurunuz");
        return;
      }
    }

    formSubmitHandler({
      authorName,
      authorEmail,
      content,
    });
    setAuthorName("");
    setAuthorEmail("");
    setContent("");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col items-end border border-color7 rounded-lg p-4">
          <textarea
            className="w-full focus:outline-none bg-transparent tracking-wide"
            rows="5"
            placeholder="Yorum, Soru, Düşünce, Katkı ..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <div className="flex gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
            {btnLabel !== "Düzenle" && (
              <>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  className="w-full px-5 py-2 border border-color7 rounded-md focus:outline-none focus:ring-2 focus:[#36d1d1]"
                  required
                  placeholder="İsim ... (yorumda gözükecek)"
                  onChange={(e) => setAuthorName(e.target.value)}
                  value={authorName}
                />
                <input
                  type="email"
                  id="authorEmail"
                  name="authorEmail"
                  className="w-full px-5 py-2 border border-color7 rounded-md focus:outline-none focus:ring-2 focus:[#36d1d1]"
                  required
                  placeholder="Mail ... (yorumda gözükmez)"
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  value={authorEmail}
                />
              </>
            )}

            <div className="flex items-center gap-x-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-color3 text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {btnLabel}
              </button>
              {formCancelHandler && (
                <button
                  onClick={formCancelHandler}
                  type="button"
                  className="px-5 py-2 text-red-500 rounded-lg border border-red-500"
                >
                  İptal
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        theme="dark"
        closeOnClick
        autoClose={2000}
        position="bottom-left"
      />
    </>
  );
};

export default CommentForm;
