import ContactForm from "@/Components/Contact/ContactForm";
import { fetchInfos } from "@/app/actions/fetchDatas";
import { Loader } from "@/Components/Layouts/Loader";
import { InfoType } from "@/lib/types/types";

const INFO_KEY = "İletişim";

export async function generateMetadata() {
  let data: InfoType[] | null = null;
  try {
    data = (await fetchInfos(INFO_KEY)) as InfoType[];
  } catch (error) {
    console.error("İletişim meta verisi çekilemedi:", error);
  }

  const info = data && data.length > 0 ? data[0] : null;

  return {
    title: info?.name || "İletişim | Altans Blog",
    description:
      info?.content?.substring(0, 150) ||
      "Bize ulaşın: İletişim bilgilerimiz ve formu.",
  };
}

export default async function Contact() {
  let data: InfoType[] | null = null;

  try {
    data = (await fetchInfos(INFO_KEY)) as InfoType[];
  } catch (error) {
    console.error("İletişim verisi çekilemedi:", error);
  }

  const content = data && data.length > 0 ? data[0].content : null;

  if (!content) {
    return <Loader />;
  }

  return <ContactForm content={content} />;
}
