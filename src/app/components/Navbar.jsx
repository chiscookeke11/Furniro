"use client";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import argentWebWallet from "utils/argentWallet";


const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [account, setAccount] = useState(null);
  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Shop", url: "/shop" },
    { label: "About", url: "home" },
    { label: "Contact", url: "home" },
  ];

  const iconLinks = [
    { icon: <User />, url: "home" },
    { icon: <Search />, url: "home" },
    { icon: <Heart />, url: "home" },
    { icon: <ShoppingCart />, url: "home" },
  ];


  const handleConnect = async () => {
    try {
       const response =  await argentWebWallet.requestConnection({
          callbackData: "custom_callback_data",
          approvalRequests: [
             {
                tokenAddress: "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
                amount: BigInt("100000000000000000").toString(),

                spender: "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a",
             },
          ],
       });
       const { account: sessionAccount } = response
       setAccount(sessionAccount);

    } catch (err) {
       console.error(err);
    }
 };


 const handleDisconnect = () => {
  setAccount(null); // Clear the connected account in your state
  console.log("Disconnected from Argent Web Wallet");
};

const isConnected = !!account;



  return (
   <header className='font-poppins w-full flex items-center justify-between bg-white px-[5%] py-[2%] shadow-lg  ' >

     <Link href="/" ><Image src="/logo/logo.svg" alt='logo' height={100} width={150} /></Link>


    {isConnected?  <button onClick={handleDisconnect}>Disconnect</button> : ( <button onClick={handleConnect} className="cursor-pointer text-black bg-amber-500 py-2 px-5 " >Connect wallet</button>) }



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
