import { FC } from "react";

interface RenderHTMLProps {
  HTML: string;
}

const RenderHTML: FC<RenderHTMLProps> = (props) => (
  <span
    className="py-2 text-zinc-500"
    dangerouslySetInnerHTML={{ __html: props.HTML.slice(0, 200) }}
  ></span>
);

export default RenderHTML;