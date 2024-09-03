"use client";
import { useRef, useState, useEffect } from "react";

export default function IconButton({ children, text, color, ...props }) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

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
