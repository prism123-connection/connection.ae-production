import React from "react";
import VerticalNavbar from "./dashboard/components/vertical_navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <div className="flex">
          <VerticalNavbar />
          <div className="flex-1">{children}</div>
        </div>

  );
}
