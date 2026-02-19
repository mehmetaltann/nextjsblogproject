import siteConfig from "@/lib/config/seo.config";
import localFont from "next/font/local";
import AuthProvider from "./provider";
import { fetchCategories } from "@/app/actions/fetchDatas";
import { ClientContextProvider } from "@/store/ClientContext";
import { ToastContainer } from "react-toastify";
import { auth } from "@/auth";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const myFont = localFont({
  src: "../lib/fonts/NotoSans-VariableFont.ttf",
  variable: "--font-notosans",
});

export async function generateMetadata() {
  let categoryNames: string[] = [];

  try {
    const categories = await fetchCategories();

    if (Array.isArray(categories)) {
      categoryNames = categories.map((i) => i.name);
    }
  } catch (error) {
    console.error("Global kategoriler çekilemedi:", error);
  }

  return {
    title: {
      default: siteConfig.title,
      template: "%s - Altan's Blog",
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords, ...categoryNames],
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

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={myFont.className}>
        <AuthProvider session={session}>
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
