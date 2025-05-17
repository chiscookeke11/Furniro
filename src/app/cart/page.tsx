"use client"

import CartTotals from "app/components/CartTotals"
import OrderTable from "app/components/OrderTable"
import ReusableHero from "app/components/ReusableHero"
import ServiceHighlights from "app/components/ServiceHighlights"
import Loader from "app/components/ui/Loader"
import { useEffect, useState } from "react"
import { supabase } from "utils/supabaseClient"
import { CartItemm } from "interfaces/CartItemInterface";


export default function Page() {
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<CartItemm[]>([])


  const tableName = "cart"


  useEffect(() => {



    const fetchOrders = async () => {
      setLoading(true)
      const { data, error } = await supabase.from(tableName).select("*")




      if (error) {
        console.log("Error fetching orders", error)
        setLoading(false)
      }
      else if (data) {
        setOrderData(data)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])


  const removeItemFromCart = async (product_id) => {
    const { error } = await supabase.from(tableName).delete().eq("product_id", product_id);

    if (error) {
      console.log("error deleting item", error)
    }

    if (!error) {
      setOrderData((prevItems) => prevItems.filter((item) => item.product_id !== product_id))
    }
  }

const subTotal = orderData.reduce(
  (acc, item) => acc + item.product_price * item.product_amount, 0
);

console.log(subTotal)



  if (loading) {
    return <Loader />
  }




  return (
    <div>
      <ReusableHero pageName="Cart" />

      <section className="w-full flex items-start justify-between gap-10 py-[80px] md:px-[6%] px-[10px] flex-col md:flex-row">
        <OrderTable orderData={orderData} removeItemFromCart={removeItemFromCart} />
        <CartTotals subTotal={subTotal} />
      </section>

      <ServiceHighlights />
    </div>
  )
}
