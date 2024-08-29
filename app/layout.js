import { Outfit } from "next/font/google";
import { AuthProvider } from "./provider";
import { BlogContextProvider } from "@/store/BlogContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Altan Blog App",
  description: "Mehmet Altan tarafından yapılmıştır.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <BlogContextProvider>{children}</BlogContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
