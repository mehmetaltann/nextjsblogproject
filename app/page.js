"use client";
import Footer from "@/Components/Layouts/Footer";
import Header from "@/Components/Layouts/Header";
import BlogList from "@/Components/HomePageComponents/BlogList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
