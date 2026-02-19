"use client";

import { useRef, useMemo, useContext, forwardRef, useImperativeHandle } from "react";
import { AdminContext } from "@/store/AdminContext";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const TextEditor = forwardRef((_, ref) => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("AdminContext must be used within an AdminContextProvider");
  }

  const { description } = context;
  const editor = useRef<any>(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: "Yazınız...",
    height: 600,
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },
    cleanHTML: false,
  }), []);

  useImperativeHandle(ref, () => ({
    getContent: () => editor.current?.value || "",
  }));

  return (
    <div tabIndex={1}>
      <JoditEditor
        ref={editor}
        value={description}
        config={config}
        onBlur={() => {}}
        onChange={() => {}}
      />
    </div>
  );
});

TextEditor.displayName = "TextEditor";

export default TextEditor;
