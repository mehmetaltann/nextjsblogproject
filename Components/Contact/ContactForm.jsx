"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FaMailBulk } from "react-icons/fa";
import { useFormState } from "react-dom";
import { sendMessage } from "@/app/actions/actions";

const ContactForm = ({ type, data }) => {
  const [formState, formAction] = useFormState(sendMessage, null);

  useEffect(() => {
    if (formState?.msg) {
      toast.success(formState.msg);
      document.getElementById("myform").reset();
    }
  }, [formState?.msg]);

  return (
    <AnimationWrapper keyValue={type} className="flex flex-col justify-between">
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <div className="mb-4 flex items-center justify-center gap-2 text-color1">
            <FaMailBulk size={50} />
            <h2 className="text-4xl tracking-tight font-extrabold text-center ">
              İletişim
            </h2>
          </div>
          <p className="mb-8 lg:mb-12 font-light text-center text-gray-500 sm:text-xl">
            {data.content}
          </p>
          <form
            id="myform"
            action={formAction}
            className="flex flex-col gap-3 mb-8 lg:mb-10"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-color1"
              >
                Mail Adresiniz
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Email ..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-color1"
              >
                Konu
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Başlık ..."
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-color1"
              >
                Mesajınız
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                required
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Nasıl Yardımcı Olabiliriz..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-color1 sm:w-fit hover:bg-color5 "
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
