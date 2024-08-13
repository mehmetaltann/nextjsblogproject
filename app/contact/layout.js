import Footer from "@/Components/Layouts/Footer";
import Header from "@/Components/Layouts/Header";

export default function Layout({ children }) {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
  }