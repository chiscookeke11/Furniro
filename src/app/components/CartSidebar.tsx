"use client"


import { useFurniroContext } from "context/FurniroContext";
import { CartItemm } from "interfaces/CartItemInterface";
import { CircleX, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";





export default function CartSidebar() {


    const {showCart, setShowCart} =  useFurniroContext();
    const [cartItems, setCartItems] = useState<CartItemm[]>([])

    useEffect(() => {

        const fetchCartData = async () => {
            const {data, error} = await supabase.from("cart").select("*");

            if (error) {
                console.log("Error fetching cart data", error);
            }
            else if (data) {
                setCartItems(data)
            }
        };
        fetchCartData();





        document.body.style.overflowY = showCart ? "hidden" : "auto";
    }, [showCart])


const removeItemFromCart = async (product_id: string) => {
  const { error } = await supabase.from("cart").delete().eq("product_id", product_id);

  if (!error) {
  setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product_id));
  }
};




const subtotal = cartItems.reduce(
  (acc, item) => acc + item.product_price * item.product_amount,
  0
);



    return (

                <div onClick={
                   (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                   }
                }
                 className={`font-poppins  w-[417px] h-screen md:h-[746px] bg-[#FFFFFF] fixed top-0 right-0 z-100 overflow-y-auto custom-scrollbar py-6 transfrom transition-all duration-200 ${showCart ?  "translate-x-0" : "translate-x-[120%]" }  `}  >


                    <div className=" w-[350px] flex justify-between mx-auto items-start mb-[40px]  " >

                        <div className="pb-[50px] border-b-[1px] border-[#D9D9D9] w-[85%] "  >   <h1 className=" font-semibold text-2xl text-[#000000]  " >Shopping cart</h1></div>


                    <LockKeyhole onClick={ () => setShowCart(false) } size={17} color="#9F9F9F" className="cursor-pointer text-amber-100  "  />


                    </div>


                    <div className=" w-[350px] h-fit  mx-auto " >








<ul className="flex flex-col items-stretch gap-5  " >
    {cartItems.map((product, index) =>  {







        return (
              <li  key={index} className=" w-full  flex items-center justify-between gap-7 pr-[10px] cursor-pointer bg-transparent p-1 rounded-sm hover:bg-[#F9F1E7] transition duration-150 ease-in-out " >
            <div className=" w-[50px] h-[50px] md:w-[105px] md:h-[105px] rounded-[10px] relative bg-[#D9D9D9]  " >
                <Image src={product.product_image} alt={product.product_name} width={100} height={100} className="w-full h-full object-cover rounded-[10px] absolute " />
            </div>


<div className=" flex flex-col items-start gap-5 " >
<h3 className=" text-[#000000] text-base font-normal " >    {product.product_name}</h3>
<p className="text-[13px] font-[300px] text-[#000000]  "  > <span className=" text-base "  >  {product.product_amount} </span>  x <span className=" text-[#B88E2F] font-medium text-xs "  >Rs. {product.product_price} </span>     </p>
</div>

<button  onClick={() => removeItemFromCart(product.product_id)} className="cursor-pointer " >
<CircleX size={20}  className=" hover:text-[red] text-[#9F9F9F]  "   />
</button>



          </li>
        )
    })}



    <div className=" w-full flex items-center justify-between  max-w-[280px] pl-[6%] mt-[25px] "  >
        <h3 className=" text-[#000000] text-base font-normal " >Subtotal</h3>
        <p className="text-[#B88E2F] font-semibold text-base " >Rs. {subtotal.toLocaleString()}</p>
    </div>
</ul>












                    </div>

                    <hr className="w-full bg-[#D9D9D9] h-[1px] my-[25px]   "  />

                    <div className="flex items-center justify-center gap-[14px] "  >
    <Link href={"/cart"} >  <button onClick={() => setShowCart(false) } className="py-[6px] px-[25px] text-center border-[1px] border-[#000000] rounded-[50px] text-xs font-normal text-[#000000] cursor-pointer transition duration-150 ease-in-out hover:border-[#B88E2F] hover:text-[#B88E2F] "  >Cart</button></Link>
    <button className="py-[6px] px-[25px] text-center border-[1px] border-[#000000] rounded-[50px] text-xs font-normal text-[#000000]  cursor-pointer  transition duration-150 ease-in-out hover:border-[#B88E2F] hover:text-[#B88E2F]" >Checkout</button>
    <button className="py-[6px] px-[25px] text-center border-[1px] border-[#000000] rounded-[50px] text-xs font-normal text-[#000000]  cursor-pointer  transition duration-150 ease-in-out hover:border-[#B88E2F] hover:text-[#B88E2F]" >Comparison</button>
</div>

        </div>


    )
}