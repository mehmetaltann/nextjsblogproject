import Link from "next/link";
import { signOut } from "next-auth/react";

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
      aria-label={title}
      className={`${name === activeNavName ? "font-bold text-color1" : "font-semibold text-[#A5A5A5]"} flex items-center gap-x-2 py-2 text-lg`}
      onClick={() => {
        setActiveNavName(name);
        if (name === "signOut") signOut({ callbackUrl: "/", redirect: true });
      }}
    >
      {icon}
      {title}
    </Link>
  );
};

export default NavItem;
