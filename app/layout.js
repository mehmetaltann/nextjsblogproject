import { AuthProvider } from "./provider";
import { ClientContextProvider } from "@/store/ClientContext";
import { connectToMongoDB } from "@/lib/config/db";
import {
  montserrat,
  roboto,
  inter,
  poppins,
  tinos,
  fontVariablesString,
} from "@/lib/utils/fonts";
import "./globals.css";

export const metadata = {
  title: "Altan Blog App",
  description: "Mehmet Altan tarafından yapılmıştır.",
};

export default function RootLayout({ children }) {
  connectToMongoDB();
  return (
    <html lang="en" className={fontVariablesString}>
      <body className="font-notosans">
        <AuthProvider>
          <ClientContextProvider>{children}</ClientContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
