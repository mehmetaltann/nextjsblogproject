import { deleteInfo, updateInfo } from "@/app/actions/actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InfoType } from "@/lib/types/types";

interface InfoTableProps {
  selectedInfo: string;
  infoData: InfoType;
  setSelectedInfo: (info: string) => void;
}

const InfoTable = ({
  selectedInfo,
  infoData,
  setSelectedInfo,
}: InfoTableProps) => {
  const { _id, name, content } = infoData;
  const [newContent, setNewContent] = useState<string>(content);
  const [newName, setNewName] = useState<string>(name);

  useEffect(() => {
    setNewContent(content);
    setNewName(name);
  }, [selectedInfo, content, name]);

  const handleInfoUpdate = async () => {
    try {
      const response = await updateInfo({
        _id,
        content: newContent,
        name: newName,
      });
      const { msg } = response as { msg: string };
      toast.success(msg);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Güncelleme sırasında hata oluştu.");
      } else {
        toast.error("Güncelleme sırasında bilinmeyen bir hata oluştu.");
      }
    }
  };

  const handleInfoDelete = async () => {
    try {
      const response = await deleteInfo(_id);
      const { msg } = response as { msg: string };
      toast.success(msg);
      setSelectedInfo("new");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Silme sırasında hata oluştu.");
      } else {
        toast.error("Silme sırasında bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      <input
        type="text"
        id="isim"
        name="isim"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="İsim ..."
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        required
      />
      <textarea
        id="content"
        name="content"
        rows={18}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="İçerik..."
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        required
      />
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <button
          onClick={handleInfoUpdate}
          type="button"
          className="flex-[2] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Güncelle
        </button>
        <button
          onClick={handleInfoDelete}
          type="button"
          className="flex-[1] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default InfoTable;
