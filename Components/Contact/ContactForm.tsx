"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FaMailBulk } from "react-icons/fa";
import { useFormState } from "react-dom";
import { sendMessage } from "@/app/actions/actions";

interface ContactFormProps {
  content: string;
}

const ContactForm = ({ content }: ContactFormProps) => {
  const [formState, formAction] = useFormState(sendMessage, null);

  useEffect(() => {
    if (Array.isArray(formState)) return;
    if (formState?.msg) {
      toast.success(formState.msg);
      (document.getElementById("myform") as HTMLFormElement).reset();
    }
  }, [formState]);

  return (
    <AnimationWrapper
      keyValue="ContactForm"
      className="flex flex-col justify-between"
    >
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <div className="mb-4 flex items-center justify-center gap-2 text-color1">
            <FaMailBulk size={50} />
            <h2 className="text-4xl tracking-tight font-extrabold text-center ">
              İletişim
            </h2>
          </div>
          <p className="mb-8 lg:mb-12 font-light text-center text-gray-500 sm:text-xl">
            {content}
          </p>
          <form id="myform" action={formAction} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-color1">
                Mail Adresiniz
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Email..."
                className="
        w-full rounded-lg border border-gray-300 bg-gray-50
        px-4 py-3 text-sm
        focus:outline-none focus:ring-2 focus:ring-color1/40
        transition
      "
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-color1">
                Konu
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Başlık..."
                className="
        w-full rounded-lg border border-gray-300 bg-gray-50
        px-4 py-3 text-sm
        focus:outline-none focus:ring-2 focus:ring-color1/40
        transition
      "
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-color1">
                Mesajınız
              </label>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="Nasıl yardımcı olabiliriz..."
                className="
        w-full rounded-lg border border-gray-300 bg-gray-50
        px-4 py-3 text-sm resize-none
        focus:outline-none focus:ring-2 focus:ring-color1/40
        transition
      "
              />
            </div>

            <button
              type="submit"
              className="
      mt-2 rounded-lg bg-color1 px-6 py-3 text-sm font-medium
      text-white transition hover:bg-color5
    "
            >
              Gönder
            </button>
          </form>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default ContactForm;
