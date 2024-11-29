import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

interface DeleteButtonProps {
  deleteHandler: (id: string) => void;
  id: string;
}

const buttonClassName =
  "flex gap-2 items-center justify-center py-2 px-4 font-semibold shadow-md rounded-lg text-white bg-red-600 shadow-red-400/40";

const DeleteButton = ({ deleteHandler, id }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);

  const deleteHandlerInside = () => {
    deleteHandler(id);
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={buttonClassName}>
        <FaTrashAlt /> Sil
      </button>

      <ConfirmationModal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <FaTrashAlt size={56} className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Silme Onayı</h3>
            <p className="text-sm text-gray-500">
              Silmek istediğinizden emin misiniz?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className={`${buttonClassName} w-full`}
              onClick={deleteHandlerInside}
            >
              Sil
            </button>
            <button
              className={`${buttonClassName} w-full`}
              onClick={() => setOpen(false)}
            >
              İptal
            </button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default DeleteButton;
