"use client"


import { useFurniroContext } from "context/FurniroContext"




export default function Overlay() {

    const { setShowCart, showCart } = useFurniroContext();




    return (
        <div onClick={() => setShowCart(false)} className={`${showCart ? "fixed inset-0 w-full h-screen bg-[#00000033] z-50 overflow-hidden" : null}`} >

        </div>
    )
}