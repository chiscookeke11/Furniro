"use client";

import DetailedInfoSection from "app/components/DetailedInfoSection";
import Footer from "app/components/Footer";
import Navbar from "app/components/Navbar";
import RelatedProducts from "app/components/RelatedProducts";
import { useFurniroContext } from "context/FurniroContext";
import { Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductPage = () => {
  const { tableData } = useFurniroContext();
  const params = useParams();
  const id = params?.id?.toString();

  const product = tableData.find((item) => item.id.toString() === id);

  const [selectedSize, setSelectedSize] = useState("L");
  const [itemAmount, setItemAmount] = useState(1);





  const chooseSize = (size: string) => {
    setSelectedSize(size)
  }



  if (!product) {
    return <p>loading ....</p>;
  }


  const sizes =  [ "L", "XL", "XS" ];

  const availableColors = [
    {
      name: "Purple",
      value: "#816DFA"
    },
    {
      name: "Black",
      value: "#000000",
    },
    {
      name: "Brown",
      value: "#B88E2F",
    },
  ]


  const increaseItemAmount = () => {
      setItemAmount((prev) => prev + 1)
  }


  const decreaseAmount = () => {
    if (itemAmount !== 0) {
      setItemAmount((prev) => prev - 1)
    }
  }


  return (
    < div className="bg-white font-poppins">
    <Navbar/>


    <section className="w-full flex items-start justify-between gap-10   "  >
      {/* left side  */}
      <div></div>




{/* right side  */}
<div className=" w-full max-w-[606.1px] flex items-start flex-col gap-6 "  >

  {/* top part  */}
<div className="w-full flex flex-col items-Start gap-4  " >
  <h1>Asgaard sofa</h1>
  <h3>Rs. 250,000.00</h3>

  <div>rating     5 customer review </div>

  <p>Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.

</p>


<div className="w-fit flex flex-col items-start gap-3  " >
<p>Size</p>
  <div className="w-fit flex flex-row items-center justify-start gap-5 ">

 {sizes.map((size, index) => (
  <button onClick={() => chooseSize(size)} className={` w-[30px] h-[30px] rounded-[5px]   font-normal text-[13px] cursor-pointer ${selectedSize === size ? "bg-[#B88E2F] text-white " : "bg-[#F9F1E7] text-[#000000]"} `}   key={index}> {size}  </button>
 ))}
</div>
</div>

<div  className="w-fit flex flex-row items-center justify-start gap-5 " >

  {availableColors.map((color, index) => (
    <button key={index} className="w-[30px] h-[30px] rounded-full cursor-pointer   " style={{backgroundColor: color.name}}  >   </button>
  ))}

</div>


<div className="w-fit flex flex-row items-center justify-start gap-7 ">


  <div  className="w-full  w-[123px] border-[1px] border-[#9F9F9F] rounded-[10px] h-[64px] px-2 py-3 flex items-center justify-between gap-5 text-[#000000] font-medium text-base " >

    <button onClick={decreaseAmount }  className="flex items-center justify-center w-[20px] h-[20px] cursor-pointer "  ><Minus/></button>
    <p> {itemAmount} </p>
    <button  onClick={increaseItemAmount}  className="flex items-center justify-center w-[20px] h-[20px] cursor-pointer " ><Plus/></button>

  </div>

<button className=" cursor-pointer md:w-[215px] border-[1px] border-[#000000] rounded-[10px] h-[64px] px-2 py-3 flex items-center justify-center gap-5 text-[#000000] font-medium text-base text-center  " > Add To Cart  </button>
<button className=" cursor-pointer md:w-[215px] border-[1px] border-[#000000] rounded-[10px] h-[64px] px-2 py-3 flex items-center justify-center gap-5 text-[#000000] font-medium text-base text-center  " > <Plus/> Compare  </button>

</div>

</div>





  {/* bottom part  */}

</div>
    </section>







<DetailedInfoSection
 detailed_description={product.detailed_description}
 image1={product.image_url}
   />

      <RelatedProducts
      category={product.category}
         />
      <Footer/>
    </div>
  );
};

export default ProductPage;
