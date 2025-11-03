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

  const config = useMemo(() => ({
  readonly: false,
  placeholder: "Yazınız...",
  height: 600,
  uploader: {
    insertImageAsBase64URI: true,
    imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
  cleanHTML: {
    allowTags: {
      div: {
        class: true,
        style: true,
      },
      img: {
        src: true,
        alt: true,
        style: true,
      },
      p: true,
      h1: true,
      h2: true,
      h3: true,
      a: {
        href: true,
        target: true,
      },
      ul: true,
      ol: true,
      li: true,
      strong: true,
      em: true,
      br: true,
      script: true,
    },
 
    replaceOldTags: false, 
    fillEmptyParagraph: false,
    removeEmptyElements: false,
  },
}), []);

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