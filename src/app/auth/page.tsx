"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "utils/supabaseClient";

import ReusableHero from "app/components/ReusableHero";
import OrderTable from "app/components/OrderTable";
import CartTotals from "app/components/CartTotals";
import ServiceHighlights from "app/components/ServiceHighlights";
import Loader from "app/components/ui/Loader";

export default function Page() {
  const [loading, setLoading] = useState(true); // ✅ Start loading immediately
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/SignIn"); // ✅ Redirect if not authenticated
      } else {
        setLoading(false); // ✅ Allow rendering once session is valid
      }
    };

    checkUser();

    // ✅ Optional: react to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth/SignIn");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return <Loader />; // ✅ Block page while loading
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
  );
}
