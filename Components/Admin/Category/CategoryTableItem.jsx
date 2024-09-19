"use client";
import { deleteCategory } from "@/app/actions/actions";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { memo, useEffect } from "react";

const DeleteButton = () => {
  const pending = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="py-1 px-4 rounded-3xl bg-color8 text-white text-sm"
    >
      Sil
    </button>
  );
};

const DeleteForm = ({ id, formAction }) => {
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
};

const CategoryTableItem = ({ name, mongoId, color }) => {
  const [formState, formAction] = useFormState(deleteCategory, null);
  const divStyle = {
    backgroundColor: "#" + color,
  };
  console.log(formState?.msg);

  useEffect(() => {
    toast.success(formState?.msg);
  }, [formState]);

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap text-left font-semibold"
      >
        {name}
      </th>
      <th
        scope="row"
        className="p-4 font-medium text-gray-900 whitespace-nowrap text-left"
      >
        <div style={divStyle} className={`py-2 px-0.2 rounded-full`}></div>
      </th>
      <th
        scope="row"
        className="px-6 py-4 cursor-pointer text-center w-2"
        style={{ textAlign: "center" }}
      >
        <DeleteForm id={mongoId} formAction={formAction} />
      </th>
    </tr>
  );
};

export default memo(CategoryTableItem);
