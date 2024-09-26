import { useRef, useState, useEffect } from "react";

interface IconButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  color?: string;
}

export default function IconButton({
  children,
  text,
  color,
  ...props
}: IconButtonProps) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <a
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex p-2 items-center opacity-60 rounded-lg hover:opacity-100 text-white ${
            color || "bg-black"
          }`}
          {...props}
        >
          {children}
          <div
            style={{ width: hovered ? ref.current?.offsetWidth || 0 : 0 }}
            className="overflow-x-hidden transition-all duration-300 ease-out"
          >
            <span ref={ref} className="px-1.5">
              {text}
            </span>
          </div>
        </a>
      )}
    </>
  );
}
