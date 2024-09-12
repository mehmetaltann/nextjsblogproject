"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavItemCollapse = ({
  title,
  content,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="collapse collapse-arrow rounded-none min-h-0 py-0">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          setActiveNavName(name);
        }}
      />
      <div
        className={`collapse-title font-medium min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${
          name === activeNavName
            ? "font-bold text-color1"
            : "font-semibold text-[#A5A5A5]"
        }`}
      >
        {icon}
        {title}
      </div>
      <div className="collapse-content">
        <div className="mt-2 flex flex-col gap-y-2">
          {content.map((item, index) => (
            <Link key={index} href={item.link}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;
