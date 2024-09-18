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
  title: { default: "Altan's Blog", template: "%s - Altan's Blog" },
  description: "Tatil, Yazılım ve daha bir çok konuda rehberiniz",
  twittter: {
    card: "summary_large_image",
  },
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
