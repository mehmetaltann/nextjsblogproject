import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("./WrappedTextEditor"), {
  ssr: false,
});

const TextEditor = ({ placeholder, setDescription, description }) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
      height: 600,
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      editorRef={editor}
      value={description}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};

export default TextEditor;
