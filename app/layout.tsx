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

export async function generateMetadata() {
  const allCategories = (await fetchCategories()) as CategoryType[];

  try {
    return {
      keywords: allCategories.map((i: { name: string }) => i.name),
      metadataBase: siteConfig.siteUrl,
      site_name: siteConfig.site_name,
      title: { default: siteConfig.title, template: "%s - Altan's Blog" },
      description: siteConfig.description,
      publisher: siteConfig.publisher,
      creator: siteConfig.author,
      author: siteConfig.author,
      robots: siteConfig.robots,
      twitter: siteConfig.twitter,
      openGraph: siteConfig.openGraph,
    };
  } catch (error) {
    console.log(error);
  }
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
