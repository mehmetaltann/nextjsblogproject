import { useRef, useMemo, useContext, SetStateAction } from "react";
import { AdminContext } from "@/store/AdminContext";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("./WrappedTextEditor"), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>,
});

const TextEditor = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );
  }
  const { setDescription, description } = context;
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Yazınız ...",
      height: 600,
    }),
    []
  );

  return (
    <JoditEditor
      editorRef={editor}
      value={description}
      config={config}
      tabIndex={1}
      onBlur={(newContent: SetStateAction<string>) =>
        setDescription(newContent)
      }
    />
  );
};

export default TextEditor;
