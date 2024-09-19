import siteConfig from "@/lib/config/seo.config";
import { AuthProvider } from "./provider";
import { ClientContextProvider } from "@/store/ClientContext";
import { connectToMongoDB } from "@/lib/config/db";
import { ToastContainer } from "react-toastify";
import { Noto_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const notosans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-notosans",
});

export const metadata = {
  metadataBase: siteConfig.siteUrl,
  site_name: siteConfig.site_name,
  title: { default: siteConfig.title, template: "%s - Altan's Blog" },
  description: siteConfig.description,
  publisher: siteConfig.publisher,
  author: siteConfig.author,
  robots: siteConfig.robots,
  keywords: siteConfig.keywords,
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
};

export default function RootLayout({ children }) {
  connectToMongoDB();
  return (
    <html lang="en">
      <body className={notosans.className}>
        <AuthProvider>
          <ClientContextProvider>
            {children}
            <ToastContainer
              theme="dark"
              closeOnClick
              autoClose={2000}
              position="bottom-left"
            />
          </ClientContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
