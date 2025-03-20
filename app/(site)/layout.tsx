import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Testimonial from "../sections/testimonial";
import Footer from "../sections/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Navbar />
        {children}
        <Testimonial/>
        <Footer/>
      </>
  );
}
