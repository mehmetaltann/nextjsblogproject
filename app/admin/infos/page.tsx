import Infos from "@/Components/Admin/Infos/Infos";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { InfoType } from "@/lib/types/types";

export default async function Info() {
  let allInfos: InfoType[] = [];

  try {
    const fetchedInfos = (await fetchInfos("All")) as InfoType[];
    if (fetchedInfos) {
      allInfos = fetchedInfos;
    }
  } catch (error) {
    console.error("Bilgiler çekilemedi:", error);
  }

  if (allInfos.length === 0) {
    return <Loader />;
  }

  return <Infos allInfos={allInfos} />;
}
