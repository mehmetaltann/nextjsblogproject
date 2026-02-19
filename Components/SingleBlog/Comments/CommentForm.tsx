"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

interface FormData {
  authorName: string;
  authorEmail: string;
  content: string;
}

interface CommentFormProps {
  formSubmitHandler: (data: FormData) => void;
  btnLabel: string;
  formCancelHandler?: () => void;
  initialText?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  formSubmitHandler,
  btnLabel,
  formCancelHandler,
  initialText = "",
}) => {
  const [formData, setFormData] = useState<FormData>({
    authorName: "",
    authorEmail: "",
    content: initialText,
  });

  const { authorName, authorEmail, content } = formData;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (btnLabel !== "Güncelle") {
      if (!authorName || !authorEmail || !content) {
        toast.error("Tüm alanları doldurunuz.");
        return;
      }
    }

    if (content.trim() === "") {
      toast.error("Yorum boş olamaz.");
      return;
    }

    formSubmitHandler(formData);

    if (btnLabel !== "Güncelle") {
      setFormData({
        authorName: "",
        authorEmail: "",
        content: "",
      });
    }
  };

  const autoResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className={`
          flex flex-col gap-4 bg-zinc-50 rounded-xl p-5
          ${btnLabel === "Yanıtla" ? "mt-4" : ""}
        `}
      >
        <textarea
          name="content"
          value={content}
          rows={btnLabel === "Gönder" ? 5 : 4}
          placeholder="Yorum, soru, düşünce..."
          onChange={(e) => {
            handleInputChange(e);
            autoResize(e);
          }}
          className="
            w-full resize-none bg-transparent
            text-zinc-800 placeholder:text-muted-foreground
            focus:outline-none
          "
        />

        {btnLabel !== "Güncelle" && (
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="authorName"
              value={authorName}
              onChange={handleInputChange}
              placeholder="İsim (yorumda gözükmez)"
              className="
                w-full px-4 py-2 bg-white
                rounded-lg border border-zinc-200
                focus:outline-none focus:ring-2 focus:ring-color1
              "
            />

            <input
              type="email"
              name="authorEmail"
              value={authorEmail}
              onChange={handleInputChange}
              placeholder="Mail (yorumda gözükmez)"
              className="
                w-full px-4 py-2 bg-white
                rounded-lg border border-zinc-200
                focus:outline-none focus:ring-2 focus:ring-color1
              "
            />
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          {formCancelHandler && (
            <button
              type="button"
              onClick={formCancelHandler}
              className="
                px-5 py-2 text-sm rounded-lg
                border border-zinc-300 text-zinc-600
                hover:bg-zinc-100 transition
              "
            >
              İptal
            </button>
          )}

          <button
            type="submit"
            className="
              px-6 py-2 text-sm rounded-lg
              bg-color1 text-white
              hover:opacity-90 transition
            "
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
