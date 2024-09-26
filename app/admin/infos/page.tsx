import Infos from "@/Components/Admin/Infos/Infos";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { InfoType } from "@/lib/types/types";

export default async function Info(): Promise<JSX.Element> {
  const allInfos = (await fetchInfos()) as InfoType[];

  return (
    <Suspense fallback={<Loader />}>
      <Infos allInfos={allInfos} />
    </Suspense>
  );
}
