
import Link from "next/link";



interface CartTotalsProps {
    subTotal: number
}

export default function CartTotals({subTotal}: CartTotalsProps ) {
    return (
        <div className=" font-poppins bg-[#F9F1E7] flex items-center justify-start flex-col w-[300px] mx-auto md:mx-none md:w-full md:max-w-[393px] md:min-h-[390px] gap-5 md:gap-10 py-5 px-6 rounded-lg  " >
            <h2 className=" text-xl md:text-[32px] font-semibold text-[#000000] "  >Cart Totals</h2>



            <div className=" w-full max-w-[250px]  flex flex-col gap-10 mt-[10px] md:mt-[20px] " >
                <div className="w-full flex items-center justify-between " >
                    <h4 className=" text-sm md:text-base font-medium text-[#000000] "  >Subtotal</h4>
                    <p className=" text-sm md:text-base text-[#9F9F9F] font-normal " >{subTotal} </p>

                </div>

                <div className="w-full flex items-center justify-between " >
                    <h4 className=" text-sm md:text-base font-medium text-[#000000] ">Total</h4>
                    <p className=" text-lg md:text-xl text-[#B88E2F] text-medium " > {subTotal} </p>

                </div>

                 </div>



<Link  href={"/checkout"}  >            <button className="text-[#000000] text-lg md:text-xl font-normal w-[150px] md:w-[222px] border-[1px] border-[#000000] rounded-[8px] md:rounded-[15px] h-[48px] md:h-[58.95px] cursor-pointer "  >Check Out</button></Link>
        </div>
    )
}