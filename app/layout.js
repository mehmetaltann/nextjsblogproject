import Generator from "next/font/local";
import { AuthProvider } from "./provider";
import { ClientContextProvider } from "@/store/ClientContext";
import { connectToMongoDB } from "@/lib/config/db";
import "./globals.css";

const sans = Generator({
  src: "../lib/fonts/Generator-Variable.ttf",
  variable: "--font-sans",
});

export const metadata = {
  title: "Altan Blog App",
  description: "Mehmet Altan tarafından yapılmıştır.",
};

export default function RootLayout({ children }) {
  connectToMongoDB();
  return (
    <html lang="en" className={`${sans.variable} font-sans`}>
      <body>
        <AuthProvider>
          <ClientContextProvider>{children}</ClientContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
