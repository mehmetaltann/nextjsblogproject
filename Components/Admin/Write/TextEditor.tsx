import { useRef, useMemo, useContext } from "react";
import { AdminContext } from "@/store/AdminContext";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const TextEditor = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "AdminContext must be used within an AdminContextProvider"
    );
  }
  const { setDescription, description } = context;
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Yazınız...",
      height: 600,
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      // 👇 Bu kısım eklendi: HTML temizleme ayarları
      cleanHTML: {
        removeStyle: false,   // ✅ inline style="" KORUNUR
        removeScript: false,  // ✅ <script> tag'leri KORUNUR (sadece sen kullanıyorsun)
        removeTags: [],       // başka tag silinmez
      },
    }),
    []
  );

  return (
    <div tabIndex={1}>
      <JoditEditor
        ref={editor}
        value={description}
        config={config}
        onBlur={(newContent) => setDescription(newContent)}
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default TextEditor;