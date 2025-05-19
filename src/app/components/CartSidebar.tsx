"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleX, LockKeyhole } from "lucide-react";

import { useFurniroContext } from "context/FurniroContext";
import { CartItem } from "interfaces/CartItemInterface";
import { supabase } from "utils/supabaseClient";

export default function CartSidebar() {
  const { showCart, setShowCart } = useFurniroContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      setIsSignedIn(!!sessionData?.session);
      if (sessionError) console.error("Session error:", sessionError);

      const { data: cartData, error: cartError } = await supabase.from("cart").select("*");
      if (cartError) console.error("Cart fetch error:", cartError);
      else setCartItems(cartData || []);
    };

    fetchData();
    document.body.style.overflowY = showCart ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showCart]);

  const removeItem = async (product_id: string) => {
    const { error } = await supabase.from("cart").delete().eq("product_id", product_id);
    if (!error) {
      setCartItems(prev => prev.filter(item => item.product_id !== product_id));
    } else {
      console.error("Failed to remove item:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.product_amount,
    0
  );

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={`font-poppins w-[417px] h-screen md:h-[746px] bg-white fixed top-0 right-0 z-[100] overflow-y-auto custom-scrollbar py-6 transition-all duration-200 transform ${
        showCart ? "translate-x-0" : "translate-x-[120%]"
      }`}
    >
      {/* Header */}
      <div className="w-[350px] mx-auto flex justify-between items-start mb-10">
        <div className="pb-6 border-b border-[#D9D9D9] w-[85%]">
          <h1 className="text-2xl font-semibold text-black">Shopping cart</h1>
        </div>
        <LockKeyhole
          size={17}
          color="#9F9F9F"
          className="cursor-pointer"
          onClick={() => setShowCart(false)}
        />
      </div>

      {/* Cart Items */}
      <div className="w-[350px] mx-auto">
        {isSignedIn ? (
          cartItems.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {cartItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-5 pr-2 bg-transparent p-1 rounded-sm hover:bg-[#F9F1E7] transition"
                >
                  <div className="w-[50px] h-[50px] md:w-[105px] md:h-[105px] relative bg-[#D9D9D9] rounded-[10px]">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      className="object-cover rounded-[10px]"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <h3 className="text-black text-base font-normal">{item.product_name}</h3>
                    <p className="text-sm text-black font-light">
                      <span className="text-base">{item.product_amount}</span> x{" "}
                      <span className="text-[#B88E2F] font-medium text-xs">
                        Rs. {item.product_price}
                      </span>
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.product_id)}>
                    <CircleX size={20} className="text-[#9F9F9F] hover:text-red-600" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-gray-600">Your cart is empty.</p>
          )
        ) : (
          <p className="text-center text-sm text-gray-600">Please sign in to view your cart.</p>
        )}

        {/* Subtotal */}
        {isSignedIn && (
          <div className="w-full flex justify-between mt-6 px-4 max-w-[280px]">
            <h3 className="text-black text-base font-normal">Subtotal</h3>
            <p className="text-[#B88E2F] font-semibold text-base">
              Rs. {subtotal.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <hr className="w-full bg-[#D9D9D9] h-[1px] my-6" />

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Link href="/cart">
          <button
            onClick={() => setShowCart(false)}
            className="py-2 px-6 border border-black rounded-full text-xs font-normal text-black hover:border-[#B88E2F] hover:text-[#B88E2F]"
          >
            Cart
          </button>
        </Link>
        <Link href="/checkout">
          <button className="py-2 px-6 border border-black rounded-full text-xs font-normal text-black hover:border-[#B88E2F] hover:text-[#B88E2F]">
            Checkout
          </button>
        </Link>
        <button className="py-2 px-6 border border-black rounded-full text-xs font-normal text-black hover:border-[#B88E2F] hover:text-[#B88E2F]">
          Comparison
        </button>
      </div>
    </div>
  );
}
