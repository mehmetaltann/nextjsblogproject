import AboutPage from "@/Components/About/AboutPage";
import { Loader } from "@/Components/Layouts/Loader";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { InfoType } from "@/lib/types/types";

export async function generateMetadata() {
  const data = (await fetchInfos("Hakkımızda")) as InfoType[];
  const info = data && data.length > 0 ? data[0] : null;

  return {
    title: info?.name || "Hakkımızda",
    description:
      info?.content?.substring(0, 150) ||
      "Bu blogun yazarı kimdir",
  };
}

export default async function About() {
  let data: InfoType[] | null = null;
  try {
    data = (await fetchInfos("Hakkımızda")) as InfoType[];
  } catch (error) {
    console.error("Hakkımızda verisi çekilemedi:", error);
  }

  const content = data && data.length > 0 ? data[0].content : null;

  if (!content) {
    return <Loader />;
  }

  return <AboutPage content={content} />;
}
