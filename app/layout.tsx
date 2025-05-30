import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/UserContext";

const novaSB = localFont({
  src: [
    {
      path: "../public/fonts/ProximaNova-Semibold.otf",
      weight: "600",
    },
  ],
  variable: "--font-novaSB",
});

const novaRegular = localFont({
  src: [
    {
      path: "../public/fonts/ProximaNova-Regular.otf",
      weight: "500",
    },
  ],
  variable: "--font-novaRegular",
});

const novaLight = localFont({
  src: [
    {
      path: "../public/fonts/ProximaNova-Light.otf",
      weight: "400",
    },
  ],
  variable: "--font-novaLight",
});

export const metadata = {
  title: "Welcome to Connection.ae",
  description: "Your site description",
  icons: {
    icon: "/logo.svg", // path from public folder
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${novaRegular.variable} ${novaLight.variable} ${novaSB.variable}`}>
      <body suppressHydrationWarning className="font-novaRegular">
        <UserProvider>
          <Toaster richColors position="bottom-right" />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
