import CheckoutForm from "app/components/CheckoutForm";
import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";




export default function page() {
    return (
        <div>
            <ReusableHero pageName="Checkout"/>
            <section className=" flex items-start justify-between gap-10  " >
                           <CheckoutForm/>
            </section>

            <ServiceHighlights/>
        </div>
    )
}