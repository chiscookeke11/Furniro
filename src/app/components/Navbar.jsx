"use client";
import { connect, disconnect, ConnectedStarknetWindowObject } from "@argent/get-starknet";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";


const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const navLinks = [
    { label: "Home", url: "home" },
    { label: "Shop", url: "home" },
    { label: "About", url: "home" },
    { label: "Contact", url: "home" },
  ];

  const iconLinks = [
    { icon: <User />, url: "home" },
    { icon: <Search />, url: "home" },
    { icon: <Heart />, url: "home" },
    { icon: <ShoppingCart />, url: "home" },
  ];

  return (
   <header className='font-poppins w-full flex items-center justify-between bg-white px-[5%] py-[2%] shadow-lg  ' >

     <Link href="/" ><Image src="/logo/logo.svg" alt='logo' height={100} width={150} /></Link>

     <button className='py-2 px-3 bg-blue-600 rounded-sm cursor-pointer '  >Connect Wallet</button>

     <ul className=' hidden lg:flex items-center gap-6 ' >
{
  navLinks.map((navLink, index) => (
    <Link key={index} href={navLink.url} >
      <li className='mx-2 text-lg font-medium text-[#000000] hover:text-[#B88E2F] transition-all duration-300 ease-in-out ' > {navLink.label} </li>
    </Link>

  ))
}
     </ul>

     <ul className='flex items-center gap-3 ' >
      {iconLinks.map((iconLink, index) => (
        <Link key={index} href={iconLink.url} >
        <li className={`mx-2 text-[#000000] hover:text-[#B88E2F] transition-all duration-300 ease-in-out  ${index + 1 === 4 ? "block" : "hidden md:block" } `} > {iconLink.icon} </li>
         </Link>
      ))}
      <button onClick={()=> {setOpenMobileMenu(true)}} className='cursor-pointer block lg:hidden  text-[#000000] ' >
        <Menu/>
      </button>
     </ul>



     <ul className={`w-full z-20 fixed top-0 left-0 bg-[#B88E2F] h-screen transition duration-300 ease-in-out flex flex-col gap-3.5 items-center justify-center ${openMobileMenu? "translate-y-0" : "translate-y-[-100%] "} `} >
      <button onClick={()=> setOpenMobileMenu(false)} className='absolute top-5 right-7 cursor-pointer ' >
        <X className='text-white ' size={30} />
      </button>
      {
  navLinks.map((navLink, index) => (
    <Link key={index} href={navLink.url} >
      <li className='mx-2 text-base font-medium text-[#FFF3E3] hover:text-white transition-all duration-300 ease-in-out ' > {navLink.label} </li>
    </Link>
  ))
}
</ul>






      <ul className={`w-full fixed top-0 left-0 bg-[#B88E2F] h-screen transition duration-300 ease-in-out flex flex-col gap-3.5 items-center justify-center ${openMobileMenu ? "translate-y-0" : "-translate-y-full"}`}>
        <button onClick={() => setOpenMobileMenu(false)} className="absolute top-5 right-7 cursor-pointer">
          <X className="text-white" size={30} />
        </button>
        {navLinks.map((navLink, index) => (
          <Link key={index} href={navLink.url}>
            <li className="mx-2 text-base font-medium text-[#FFF3E3] hover:text-white transition-all duration-300 ease-in-out">
              {navLink.label}
            </li>
          </Link>
        ))}
        <ul className="flex items-center mt-5">
          {iconLinks.map((iconLink, index) => (
            <Link key={index} href={iconLink.url}>
              <li className={`mx-1 text-[#FFF3E3] hover:text-white ${index !== 3 ? "block" : "hidden md:block"}`}>
                {iconLink.icon}
              </li>
            </Link>
          ))}
        </ul>
      </ul>
    </header>
  );
};

export default Navbar;
