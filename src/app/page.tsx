"use client"
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import Range from "./components/Range";
import OurProducts from "./components/OurProducts";
import RoomInspirations from "./components/RoomInspirations";
import SharedSetups from "./components/SharedSetups";

export default function Home() {
  return (
    <div className="bg-[#FFFFFF] " >


      <Navbar />
      <HomeHero />
      <Range/>
      <OurProducts/>
      <RoomInspirations/>
      <SharedSetups/>
    </div>
  );
}
