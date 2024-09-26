import ContactForm from "@/Components/Contact/ContactForm";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";
import { InfoType } from "@/lib/types/types";

export const metadata = {
  title: "İletişim",
};

export default async function Contact() {
  const allInfos = (await fetchInfos()) as InfoType[];
  const data = allInfos!.find((info) => info.name === "İletişim");

  if (!data) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <ContactForm content={data.content} />
    </Suspense>
  );
}
