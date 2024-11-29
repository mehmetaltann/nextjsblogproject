import Infos from "@/Components/Admin/Infos/Infos";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { InfoType } from "@/lib/types/types";

export default async function Info() {
  const allInfos = (await fetchInfos("All")) as InfoType[];

  return <>{allInfos ? <Infos allInfos={allInfos} /> : <Loader />}</>;
}
