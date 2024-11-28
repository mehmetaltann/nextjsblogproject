import AboutPage from "@/Components/About/AboutPage";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { InfoType } from "@/lib/types/types";

export const metadata = {
  title: "Hakkımızda",
};

export default async function About() {
  const allInfos = (await fetchInfos()) as InfoType[];
  const data = allInfos!.find((info) => info.name === "Hakkımızda");

  return <>{data ? <AboutPage content={data.content} /> : <Loader />}</>;
}
