import { useRef, useMemo, useContext, SetStateAction } from "react";
import { AdminContext } from "@/store/AdminContext";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
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
      placeholder: "Yazınız...",
      height: 600,
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
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
        onBlur={(newContent: SetStateAction<string>) =>
          setDescription(newContent)
        }
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default TextEditor;
