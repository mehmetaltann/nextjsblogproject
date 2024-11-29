import Link from "next/link";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

interface NavItemProps {
  link: string;
  title: string;
  icon: ReactNode;
  name: string;
  activeNavName: string;
  setActiveNavName: (name: string) => void;
}

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}: NavItemProps) => {
  const handleClick = () => {
    setActiveNavName(name);
    if (name === "signOut") {
      signOut({ callbackUrl: "/", redirect: true });
    }
  };

  return (
    <Link
      href={link}
      aria-label={title}
      className={`flex items-center gap-x-2 py-2 text-lg ${
        name === activeNavName
          ? "font-bold text-color1"
          : "font-semibold text-[#A5A5A5]"
      }`}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Link>
  );
};

export default NavItem;
