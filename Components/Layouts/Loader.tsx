import { TbLoaderQuarter } from "react-icons/tb";
import React from "react";

export function Loader() {
  return (
    <div className="-mt-20 flex h-screen animate-spin items-center justify-center">
      <TbLoaderQuarter className="size-20 text-color1" />
    </div>
  );
}
