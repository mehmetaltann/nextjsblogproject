import Footer from "@/Components/Layouts/Footer";
import Header from "@/Components/Layouts/Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
