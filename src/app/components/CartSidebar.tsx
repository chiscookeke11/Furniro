import { ProductCardData } from "data/Mockdata";

interface CartSidebarProps {
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}




export default function CartSidebar({setShowCart}: CartSidebarProps ) {
    return (
        <div onClick={() => setShowCart(false)}  className="fixed inset-0 w-full h-screen bg-[#00000033] z-50 " >
                <div onClick={
                   (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                   }
                }
                 className=" w-[417px] h-[746px] bg-[#FFFFFF] absolute top-0 right-0 z-50 overflow-y-auto py-6  "  >
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
        </div>

    )
}