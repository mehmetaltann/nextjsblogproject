import { addInfo } from "@/app/actions/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const InfoForm = () => {
  const [formState, formAction] = useFormState(addInfo, null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(formState)) return;

    if (formState?.msg) {
      toast.success(formState.msg);
      setIsLoading(false);
    }
  }, [formState]);

  const handleFormAction = (formData: any) => {
    setIsLoading(true);
    formAction(formData);
  };

  return (
    <form action={handleFormAction} className="flex flex-col gap-2 p-3">
      <input
        type="text"
        id="isim"
        name="isim"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="İsim ..."
        required
      />
      <textarea
        id="content"
        name="content"
        rows={18}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="İçerik..."
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {isLoading ? "Yükleniyor..." : "Ekle"}
      </button>
    </form>
  );
};

export default InfoForm;
