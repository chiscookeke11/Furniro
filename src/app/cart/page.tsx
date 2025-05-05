import CartTotals from "app/components/CartTotals";
import OrderTable from "app/components/OrderTable";
import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";



export default function Page() {
    return (
        <div>

            <ReusableHero pageName="Cart" />

            <section className=" w-full flex items-start justify-between gap-10 py-[80px] md:px-[6%] px-[10px] flex-col md:flex-row  "  >

                <OrderTable/>
                <CartTotals/>
            </section>


        <ServiceHighlights/>
        </div>
    )
}