import Generator from "next/font/local";
import { AuthProvider } from "./provider";
import { BlogContextProvider } from "@/store/BlogContext";
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
  return (
    <html lang="en" className={`${sans.variable} font-sans`}>
      <body>
        <AuthProvider>
          <BlogContextProvider>{children}</BlogContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
