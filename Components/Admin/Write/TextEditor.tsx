import { useRef, useMemo, useContext, SetStateAction, useEffect } from "react";
import { AdminContext } from "@/store/AdminContext";
import dynamic from "next/dynamic";
import { registerFlickityPlugin } from "@/Components/ui/joditFlickityPlugin";
import Head from "next/head";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = () => {
  const context = useContext(AdminContext);
  if (!context)
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );

  const { setDescription, description } = context;
  const editor = useRef(null);

  useEffect(() => {
    registerFlickityPlugin();
  }, []);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: "Yazınız...",
    height: 600,
    buttons: [
      "bold",
      "italic",
      "|",
      "flickitySlider",
      "|",
      "ul",
      "ol",
      "link",
    ],
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },
  }), []);

  return (
    <div tabIndex={1}>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/flickity@2/dist/flickity.min.css"
        />
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
      </Head>

      <JoditEditor
        ref={editor}
        value={description}
        config={config}
        onBlur={(newContent: SetStateAction<string>) =>
          setDescription(newContent)
        }
        onChange={() => {}}
      />
    </div>
  );
};

export default TextEditor;
