import Infos from "@/Components/Admin/Infos/Infos";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export default async function Info() {
  const { allInfos } = await fetchInfos();

  return (
    <Suspense fallback={<Loader />}>
      <Infos allInfos={allInfos} />
    </Suspense>
  );
}
