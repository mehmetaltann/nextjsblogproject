import ContactForm from "@/Components/Contact/ContactForm";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { InfoType } from "@/lib/types/types";

export const metadata = {
  title: "İletişim",
};

export default async function Contact() {
  const data = (await fetchInfos("İletişim")) as InfoType[];

  return <>{data ? <ContactForm content={data[0].content} /> : <Loader />}</>;
}
