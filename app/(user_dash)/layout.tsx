import React from "react";
import VerticalNavbar from "./dashboard/components/vertical_navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <VerticalNavbar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
