import { TbLoaderQuarter } from "react-icons/tb";

export function Loader() {
  return (
    <div className="-mt-20 flex h-screen animate-spin items-center justify-center">
      <TbLoaderQuarter className="size-20 text-teal-500" />
    </div>
  );
}