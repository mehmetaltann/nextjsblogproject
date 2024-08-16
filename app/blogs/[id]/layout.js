import Footer from "@/Components/Layouts/Footer";
import Header from "@/Components/Layouts/Header";


export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="w-full">
        <Header />
      </div>
      {children}
      <Footer />
    </div>
  );
}
