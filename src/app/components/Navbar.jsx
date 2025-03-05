import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {


  const navLinks = [
    {
      label: "Home",
      url: "home",
    },
    {
      label: "Shop",
      url: "home",
    },
    {
      label: "About",
      url: "home",
    },
    {
      label: "Contact",
      url: "home",
    },
  ]


  const iconLinks = [
    {
      icon: <User/>,
      url: "home",
    },
    {
      icon: <Search/>,
      url: "home",
    },
    {
      icon: <Heart/>,
      url: "home",
    },
    {
      icon: <ShoppingCart/>,
      url: "home",
    },
  ]




  return (
   <header className='w-full flex items-center justify-between bg-white px-[5%] py-[2%]  ' >
     
     <Image src="/logo/logo.svg" alt='logo' height={100} width={100} />

     <ul className=' hidden md:flex items-center gap-10 ' >
{
  navLinks.map((navLink, index) => (
    <Link key={index} href={navLink.url} >
      <li className='mx-2 text-base font-medium text-[#000000] ' > {navLink.label} </li>
    </Link>
  ))
}
     </ul>

     <ul className='flex items-center gap-5 ' >
      {iconLinks.map((iconLink, index) => (
        <Link key={index} href={iconLink.url} > 
        <li className={`mx-2 ${index + 1 === 4 ? "block" : "hidden md:block" } `} > {iconLink.icon} </li>
         </Link>
      ))}
      <button className='cursor-pointer block md:hidden ' >
        <Menu/>
      </button>
     </ul>

     


   </header>
  )
}

export default Navbar
