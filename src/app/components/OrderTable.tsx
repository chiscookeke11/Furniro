import { ProductCardData } from "data/Mockdata";
import { Trash2 } from "lucide-react";
import Image from "next/image";



export default function OrderTable() {
    return (
        <div className=" md:max-w-[817px] lg:max-w-fit min-w-sm overflow-x-auto w-full  mx font-poppins  " >
            <table>
                <caption className="sr-only" > Cart Order Table - Showing all items in the cart  </caption>
                <thead  >
                    <tr>
                        <th className="bg-[#F9F1E7] h-[55px] w-[110px] p-[10px] text-center text-base text-[#000000] font-medium  " > </th>
                        <th className="bg-[#F9F1E7] h-[55px] w-[280px] p-[10px] text-center text-base text-[#000000] font-medium  " >Product</th>
                        <th  className="bg-[#F9F1E7] h-[55px] w-[112px] p-[10px] text-center text-base text-[#000000] font-medium  ">Price</th>
                        <th  className="bg-[#F9F1E7] h-[55px] w-[112px] p-[10px] text-center text-base text-[#000000] font-medium  ">Quantity</th>
                        <th  className="bg-[#F9F1E7] h-[55px] w-[250px] p-[10px] text-center text-base text-[#000000] font-medium  ">Subtotal</th>
                        <th  className="bg-[#F9F1E7] h-[55px] w-[100px] p-[10px] text-center text-base text-[#000000] font-medium  "> </th>
                    </tr>
                </thead>

                <tbody>
                  {ProductCardData.map((order, index) => (
                      <tr key={index} >
                      <td className=" text-center min-h-[55px] bg-white p-[10px] text-[#9F9F9F] font-normal text-base " >  <div className="inline-block w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] relative">
    <Image
      src={order.image}
      alt={order.furnitureName}
      fill
      className="object-cover rounded-lg"
    />
  </div></td>
                      <td className=" text-center min-h-[55px] bg-white p-[10px] text-[#9F9F9F] font-normal text-base " > {order.furnitureName} </td>
                      <td  className=" text-center min-h-[55px] bg-white p-[10px] text-[#9F9F9F] font-normal text-base " > {order.price} </td>
                      <td  className=" text-center min-h-[55px] bg-white p-[10px] text-[#000000] font-normal text-base  " > <span className=" w-8 h-8 flex items-center justify-center rounded-[5px] border border-[#9F9F9F] mx-auto " > 1</span> </td>
                      <td  className=" text-center min-h-[55px] bg-white p-[10px] text-[#9F9F9F] font-normal text-base " > {order.newPrice} </td>
                      <td  className=" text-center min-h-[55px] p-[10px] font-normal text-base " >
                           <div className="w-8 h-8 mx-auto flex items-center justify-center">
    <button className="cursor-pointer" aria-label="Remove item">
      <Trash2 color="#B88E2F" size={20} />
    </button>
  </div> </td>

                  </tr>
                  ))}
                </tbody>

            </table>

        </div>
    )
}