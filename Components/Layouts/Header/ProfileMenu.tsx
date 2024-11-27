import Link from "next/link";
import useOnclickOutside from "react-cool-onclickoutside";
import { FaLinkedin } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

const ProfileMenu = ({
  setOpenProfile,
}: {
  setOpenProfile: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();

  const ref = useOnclickOutside(() => {
    setOpenProfile(false);
  });

  return (
    <div
      ref={ref}
      className="absolute mt-18 right-4 text-base list-none text-color1 bg-white divide-y divide-gray-100 rounded-lg shadow"
    >
      <Link
        href="https://www.linkedin.com/in/mehmetaltann/"
        className="flex px-4 py-3 justify-center items-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin size={30} className="cursor-pointer" />
        <div>
          <span className="block text-sm font-semibold text-gray-900">
            Mehmet ALTAN
          </span>
          <span className="block text-sm text-gray-500 truncate">
            mehmetaltann@gmail.com
          </span>
        </div>
      </Link>

      {session ? (
        <div className="flex flex-col justify-center items-start">
          <Link
            href={"/admin"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Yönetici Paneli
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
        >
          Giriş Yap
        </button>
      )}
    </div>
  );
};

export default ProfileMenu;
