import React from "react";
import VerticalNavbar from "./dashboard/components/vertical_navbar";
import HorizontalNavbar from "./dashboard/components/horiz_navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <div className="flex">
          <VerticalNavbar />
          <div className="bg-[#F5F6FA] flex flex-col gap-5 min-h-screen w-full pl-16 p-5">
            <HorizontalNavbar/>
            {children}
          </div>
        </div>

  );
}
