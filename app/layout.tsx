import siteConfig from "@/lib/config/seo.config";
import localFont from "next/font/local";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { CategoryType } from "@/lib/types/types";
import { AuthProvider } from "./provider";
import { ClientContextProvider } from "@/store/ClientContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const myFont = localFont({
  src: "../lib/fonts/NotoSans-VariableFont.ttf",
  variable: "--font-notosans",
});

export async function generateMetadata({ params, searchParams }: any) {
  const allCategories = (await fetchCategories()) as CategoryType[];

  return {
    title: {
      default: siteConfig.title,
      template: "%s - Altan's Blog",
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords, ...allCategories.map((i) => i.name)],
    metadataBase: new URL(siteConfig.siteUrl!),
    authors: [{ name: siteConfig.author }],
    publisher: siteConfig.publisher,
    robots: siteConfig.robots,
    openGraph: {
      ...siteConfig.openGraph,
      url: siteConfig.siteUrl!,
      type: "website",
      images: siteConfig.openGraph.images,
    },
    twitter: {
      ...siteConfig.twitter,
      images: siteConfig.twitter.images,
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <AuthProvider>
          <ClientContextProvider>
            {children}
            <ToastContainer
              closeOnClick
              autoClose={1500}
              position="top-right"
              theme="light"
              pauseOnHover
            />
          </ClientContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
