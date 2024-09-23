import ContactForm from "@/Components/Contact/ContactForm";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { Suspense } from "react";

export const metadata = {
  title: "İletişim",
};

export default async function Contact() {
  const { allInfos } = await fetchInfos();
  const data = allInfos?.find((info) => info.name === "İletişim");

  return (
    <Suspense fallback={<Loader />}>
      <ContactForm data={data} />
    </Suspense>
  );
}
