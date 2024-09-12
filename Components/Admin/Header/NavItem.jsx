"use client";

import Link from "next/link";

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  return (
    <Link
      href={link}
      className={`${name === activeNavName ? "font-bold text-color1" : "font-semibold text-[#A5A5A5]"} flex items-center gap-x-2 py-2 text-lg`}
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </Link>
  );
};

export default NavItem;
