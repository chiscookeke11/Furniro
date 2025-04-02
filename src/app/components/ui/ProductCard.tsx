import Image from "next/image";




interface ProductCardProps {
    image: string,
    furnitureName: string,
    description: string,
    price: number,
    newPrice: number | null,
    discount: boolean,
}


export default function ProductCard({ image, furnitureName, description, price, newPrice, discount }: ProductCardProps) {






    return (

        <div className="bg-[#F4F5F7] w-[160px] md:w-full md:max-w-[285px] md:max-h-[446px] relative flex flex-col items-stretch justify-between cursor-pointer overflow-hidden group  "  >


            <div className=" w-full bg-green-500 h-[67.5%] relative "  >
                <Image src={image} alt={`${furnitureName} image `} height={100} width={100} className="w-full h-full object-cover " />




                {
                    discount ? <span className=" flex items-center justify-center absolute bg-[#E97171] w-12 h-12 rounded-full text-[#FFFFFF] text-base font-medium top-5 right-3  " >
                        <p>-30%</p>
                    </span> : <span className=" flex items-center justify-center absolute bg-[#2EC1AC] w-12 h-12 rounded-full text-[#FFFFFF] text-base font-medium top-5 right-3   " >
                        <p>New</p>
                    </span>
                }



            </div>


            <div className="w-full h-full p-4 flex flex-col items-start justify-center gap-2 "  >
                <h2 className="text-[#3A3A3A] font-semibold text-2xl "  >{furnitureName} </h2>
                <p className=" text-[#898989] text-base font-medium "  >{description} </p>
                <div className="w-full flex items-center gap-4 " >
                    <h2 className=" text-[#3A3A3A] text-xl font-semibold  "  > {newPrice ?? null} </h2>
                    <h3 className="text-base font-normal text-[#B0B0B0] line-through " > {price}</h3></div>
            </div>




            <div className="overlay absolute bottom-0 left-0 w-full h-0 bg-[#3A3A3A]/75  flex flex-col items-center justify-center gap-6  z-10 cursor-default overflow-hidden group-hover:h-full transition-all duration-400 ease-in-out ">

                <button className=" bg-[#ffffff] w-full max-w-[202px] text-base font-semibold text-[#B88E2F] h-full max-h-[48px] cursor-pointer transform hover:scale-90 transition-all ease-in-out duration-150 "  >Add to cart</button>

                <div className="w-full flex items-center justify-center gap-5 " >

                    <button className="text-base font-semibold text-[#ffffff] flex items-center justify-center gap-0.5 cursor-pointer hover:text-[#B88E2F] transition-all ease-in-out duration-150 "   >Share</button>
                    <button className="text-base font-semibold text-[#ffffff] flex items-center justify-center gap-0.5 cursor-pointer hover:text-[#B88E2F] transition-all ease-in-out duration-150" >Compare</button>
                    <button className="text-base font-semibold text-[#ffffff] flex items-center justify-center gap-0.5 cursor-pointer hover:text-[#B88E2F] transition-all ease-in-out duration-150" >Like</button>

                </div>

            </div>
        </div>
    )
}