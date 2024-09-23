import AboutPage from "@/Components/About/AboutPage";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchInfos } from "@/app/actions/fetchDatas";

export default async function About() {
  const { infos } = await fetchInfos();

  return (
    <Suspense fallback={<Loader />}>
      <AboutPage infos={infos} />
    </Suspense>
  );
}