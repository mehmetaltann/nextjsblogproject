import { AiFillDashboard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { MdInfoOutline } from "react-icons/md";
import { ReactElement } from "react";

interface MenuItem {
  id: number;
  link: string;
  title: string;
  name: string;
  icon: ReactElement;
  type: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    link: "/admin",
    title: "Yazı Yönetimi",
    name: "dashboard",
    icon: <AiFillDashboard className="text-xl" />,
    type: "link",
  },
  {
    id: 2,
    link: "/admin/write",
    title: "Yeni Yazı",
    name: "newPost",
    icon: <BsFillPencilFill className="text-xl" />,
    type: "link",
  },
  {
    id: 3,
    link: "/admin/categories",
    title: "Kategoriler",
    name: "categories",
    icon: <BiCategoryAlt className="text-xl" />,
    type: "link",
  },
  {
    id: 4,
    link: "/admin/infos",
    title: "Genel Bilgiler",
    name: "infos",
    icon: <MdInfoOutline className="text-xl" />,
    type: "link",
  },
  {
    id: 5,
    link: "/admin/register",
    title: "Kullanıcı Kayıt",
    name: "user",
    icon: <FaUserAlt className="text-xl" />,
    type: "link",
  },
  {
    id: 6,
    link: "/home",
    title: "Çıkış Yap",
    name: "signOut",
    icon: <FaSignOutAlt className="text-xl" />,
    type: "link",
  },
];
