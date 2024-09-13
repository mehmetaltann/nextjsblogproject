import clsx from "clsx";
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

    if (btnLabel !== "Güncelle") {
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
        <div
          className={clsx(
            "flex flex-col items-end border border-color7 rounded-lg p-4",
            btnLabel === "Yanıtla" && "mt-4 ms-4"
          )}
        >
          <textarea
            className="w-full focus:outline-none bg-transparent tracking-wide"
            rows={btnLabel === "Gönder" ? "5" : "4"}
            placeholder="Yorum, Soru, Düşünce, Katkı ..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <div className="flex gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
            {btnLabel !== "Güncelle" && (
              <>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  className="w-full px-5 py-2 border border-color7 rounded-md focus:outline-none focus:ring-2 focus:[#36d1d1] placeholder:text-sm"
                  required={btnLabel === "Gönder"}
                  placeholder={
                    btnLabel === "Gönder"
                      ? "İsim ... (yorumda gözükmez)"
                      : "İsim ..."
                  }
                  onChange={(e) => setAuthorName(e.target.value)}
                  value={authorName}
                />
                <input
                  type="email"
                  id="authorEmail"
                  name="authorEmail"
                  className="w-full px-5 py-2 border border-color7 rounded-md focus:outline-none focus:ring-2 focus:[#36d1d1] placeholder:text-sm"
                  required={btnLabel === "Gönder"}
                  placeholder={
                    btnLabel === "Gönder"
                      ? "Mail ... (yorumda gözükmez)"
                      : "Mail ..."
                  }
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  value={authorEmail}
                />
              </>
            )}

            <div className="flex items-center gap-x-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-color3 text-white"
              >
                {btnLabel}
              </button>
              {formCancelHandler && (
                <button
                  onClick={formCancelHandler}
                  type="button"
                  className="px-5 py-2 text-color8 rounded-lg border border-color8"
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
