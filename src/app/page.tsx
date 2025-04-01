"use client"
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import Range from "./components/Range";

export default function Home() {
  return (
    <div className="bg-[#FFFFFF] " >


      <Navbar />
      <HomeHero />
      <Range/>
    </div>
  );
}
