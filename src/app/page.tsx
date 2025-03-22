"use client"
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

export default function Home() {
  return (
    <>

  
      <Navbar />
      <HomeHero />
   
    </>
  );
}
