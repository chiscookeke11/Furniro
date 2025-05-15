"use client";
import { useFurniroContext } from "context/FurniroContext";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { setShowCart } = useFurniroContext();

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Shop", url: "/shop" },
    { label: "Blog", url: "/blog" },
    { label: "Contact", url: "/contact" },
  ];

  const iconLinks = [
    { icon: <User />, url: "/auth", type: "user" },
    { icon: <Search />, url: "home", type: "search" },
    { icon: <Heart />, url: "home", type: "heart" },
    { icon: <ShoppingCart />, url: "#", type: "cart" },
  ];

  const handleIconClick = (type) => {
    if (type === "cart") {
      setShowCart(true);
    }
  };

  return (
    <header className="font-poppins w-full flex items-center justify-between bg-white px-[5%] py-[2%] shadow-lg  ">
      <Link href="/">
        <Image src="/logo/logo.svg" alt="logo" height={100} width={150} />
      </Link>

      <ul className="hidden lg:flex items-center gap-6">
        {navLinks.map((navLink, index) => (
          <Link key={index} href={navLink.url}>
            <li className="mx-2 text-lg font-medium text-[#000000] hover:text-[#B88E2F] transition-all duration-300 ease-in-out">
              {navLink.label}
            </li>
          </Link>
        ))}
      </ul>

      <ul className="flex items-center gap-3">
        {iconLinks.map((iconLink, index) => (
          <li
            key={index}
            onClick={() => handleIconClick(iconLink.type)}
            className={`mx-2 text-[#000000] hover:text-[#B88E2F] transition-all duration-300 ease-in-out ${
              index + 1 === 4 ? "block" : "hidden md:block"
            }`}
          >
            <Link href={iconLink.url}>{iconLink.icon}</Link>
          </li>
        ))}
        <button
          onClick={() => {
            setOpenMobileMenu(true);
          }}
          className="cursor-pointer block lg:hidden text-[#000000]"
        >
          <Menu />
        </button>
      </ul>

      {/* Mobile Menu */}
      <ul
        className={`w-full z-20 fixed top-0 left-0 bg-[#B88E2F] h-screen transition duration-300 ease-in-out flex flex-col gap-3.5 items-center justify-center ${
          openMobileMenu ? "translate-y-0" : "translate-y-[-100%]"
        }`}
      >
        <button
          onClick={() => setOpenMobileMenu(false)}
          className="absolute top-5 right-7 cursor-pointer"
        >
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
            <li
              key={index}
              onClick={() => handleIconClick(iconLink.type)}
              className={`mx-1 text-[#FFF3E3] hover:text-white`}
            >
              <Link href={iconLink.url}>{iconLink.icon}</Link>
            </li>
          ))}
        </ul>
      </ul>
    </header>
  );
};

export default Navbar;
