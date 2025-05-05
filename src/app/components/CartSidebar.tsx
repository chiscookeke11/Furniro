"use client"


import { useFurniroContext } from "context/FurniroContext";
import { ProductCardData } from "data/Mockdata";





export default function CartSidebar() {


    const {showCart, setShowCart} =  useFurniroContext();


    return (

                <div onClick={
                   (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                   }
                }
                 className={`w-[417px] h-[746px] bg-[#FFFFFF] fixed top-0 right-0 z-100 overflow-y-auto py-6 transfrom transition-all duration-200 ${showCart ?  "translate-x-0" : "translate-x-[120%]" }  `}  >
                    <div className=" w-[350px] h-fit bg-red-600 mx-auto " >






<ul className="flex flex-col items-stretch gap-5  " >
    {ProductCardData.map((product, index) => (
        <li  key={index} className=" h-[105px] w-full bg-green-600 flex items-center justify-between gap-7 " >


        {product.furnitureName}

          </li>
    ))}
</ul>



                    </div>

        </div>


    )
}