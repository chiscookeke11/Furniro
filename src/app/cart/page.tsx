"use client"

import CartTotals from "app/components/CartTotals"
import OrderTable from "app/components/OrderTable"
import ReusableHero from "app/components/ReusableHero"
import ServiceHighlights from "app/components/ServiceHighlights"
import Loader from "app/components/ui/Loader"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "utils/supabaseClient"

export default function Page() {
  const [loading, setLoading] = useState(true) // ✅ Show loader while checking
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/SignIn")
      } else {
        setLoading(false) // ✅ Only stop loading if authenticated
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return <Loader />
  }




  return (
    <div>
      <ReusableHero pageName="Cart" />

      <section className="w-full flex items-start justify-between gap-10 py-[80px] md:px-[6%] px-[10px] flex-col md:flex-row">
        <OrderTable />
        <CartTotals />
      </section>

      <ServiceHighlights />
    </div>
  )
}
