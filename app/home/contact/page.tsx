import ContactForm from "@/Components/Contact/ContactForm";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { InfoType } from "@/lib/types/types";

export const metadata = {
  title: "İletişim",
};

export default async function Contact() {
  const allInfos = (await fetchInfos()) as InfoType[];

  const data = allInfos!.find((info) => info.name === "İletişim");

  return <>{data ? <ContactForm content={data.content} /> : <Loader />}</>;
}
