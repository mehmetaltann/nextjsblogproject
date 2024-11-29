interface RenderHTMLProps {
  HTML: string;
}

const RenderHTML = ({ HTML }: RenderHTMLProps) => (
  <span
    className="py-2 text-zinc-500"
    dangerouslySetInnerHTML={{ __html: HTML.slice(0, 200) }}
  ></span>
);

export default RenderHTML;
