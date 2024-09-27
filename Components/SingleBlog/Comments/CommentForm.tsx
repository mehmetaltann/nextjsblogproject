import clsx from "clsx";
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
  formCancelHandler = null,
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (btnLabel !== "Güncelle" && (!authorName || !authorEmail || !content)) {
      toast.error("Tüm Alanları Doldurunuz");
      return;
    }

    if (content.trim() === "") {
      toast.error("Yorum boş olamaz.");
      return;
    }

    formSubmitHandler(formData);
    setFormData({
      authorName: "",
      authorEmail: "",
      content: "",
    });
  };

  const autoResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className={clsx(
          "flex flex-col items-end border border-color7 rounded-lg p-4",
          btnLabel === "Yanıtla" && "mt-4 ms-4"
        )}
      >
        <textarea
          className="w-full focus:outline-none bg-transparent tracking-wide"
          rows={btnLabel === "Gönder" ? 5 : 4}
          placeholder="Yorum, Soru, Düşünce, Katkı ..."
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleInputChange(e);
            autoResize(e);
          }}
          name="content"
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
  );
};

export default CommentForm;
