import AboutPage from "@/Components/About/AboutPage";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { InfoType } from "@/lib/types/types";

export const metadata = {
  title: "Hakkımızda",
};

export default async function About() {
  const data = (await fetchInfos("Hakkımızda")) as InfoType[];

  return <>{data ? <AboutPage content={data[0].content} /> : <Loader />}</>;
}
