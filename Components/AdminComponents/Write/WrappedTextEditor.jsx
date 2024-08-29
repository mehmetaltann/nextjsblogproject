import React from "react";
import JoditEditor from "jodit-react";

const WrappedTextEditor = ({ editorRef, ...props }) => {
  return <JoditEditor {...props} ref={editorRef} />;
};

export default WrappedTextEditor;
