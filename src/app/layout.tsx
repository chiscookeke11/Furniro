import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { FurniroContextProvider } from "context/FurniroContext";
import CartSidebar from "./components/CartSidebar";
import Overlay from "./components/Overlay";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust as needed
});

export const metadata: Metadata = {
  title: "Furniro",
  description: "A furniture sales website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased overflow-x-hidden `}
      >
        <FurniroContextProvider>
        {children}
        <CartSidebar  />
        <Overlay/>
        </FurniroContextProvider>
      </body>
    </html>
  );
}
