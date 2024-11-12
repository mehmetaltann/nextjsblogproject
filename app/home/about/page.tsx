import AboutPage from "@/Components/About/AboutPage";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { InfoType } from "@/lib/types/types";

export const metadata = {
  title: "Hakkımızda",
};

export default async function About() {
  const allInfos = (await fetchInfos()) as InfoType[];
  const data = allInfos!.find((info) => info.name === "Hakkımızda");

  if (!data) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <AboutPage content={data.content} />
    </Suspense>
  );
}
