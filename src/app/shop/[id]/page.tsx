"use client";

import DetailedInfoSection from "app/components/DetailedInfoSection";
import RelatedProducts from "app/components/RelatedProducts";
import Loader from "app/components/ui/Loader";
import { useFurniroContext } from "context/FurniroContext";
import { Facebook, Linkedin, Minus, Plus, Twitter } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, } from 'react-share';


const ProductPage = () => {
  const { tableData } = useFurniroContext();
  const params = useParams();
  const id = params?.id?.toString();
  const [url, setUrl] = useState('');

  const product = tableData.find((item) => item.id.toString() === id);

  const [selectedSize, setSelectedSize] = useState("L");
  const [itemAmount, setItemAmount] = useState(1);
  // const [displayedPhoto, setDisplayedPhoto] = useState(product?.image_url);





  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }

  }, [])



  // const selecteDisplayedPhoto = () => {
  //   setDisplayedPhoto(product?.image_url)
  // }

  const chooseSize = (size: string) => {
    setSelectedSize(size)
  }



  if (!product) {
    return (<div className=" fixed w-full h-screen top-0 left-0 bg-white/10 backdrop-blur-md flex items-center justify-center " > <Loader /> </div>);
  }


  const sizes = ["L", "XL", "XS"];

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



      <section className="w-full flex items-start justify-center gap-10 lg:gap-20  py-10 px-[5%] flex-col md:flex-row "  >
        {/* left side  */}
        <div className="w-full max-w-[553px] h-fit flex flex-col-reverse lg:flex-row items-start gap-6 md:gap-10  " >

          <div className=" w-full md:w-fit flex-row flex lg:flex-col items-center justify-center md:justify-start  gap-5 lg:gap-10 " >

            <div className=" w-[60px] h-[60px] md:w-[76px] md:h-[80px] rounded-lg bg-[#F9F1E7] shadow-[0_4px_6px_0_#D9D9D9] relative overflow-hidden cursor-pointer " >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover absolute top-0 left-0"
              />
            </div>
            <div className="w-[60px] h-[60px] md:w-[76px] md:h-[80px] rounded-lg bg-[#F9F1E7] shadow-[0_4px_6px_0_#D9D9D9] relative overflow-hidden cursor-pointer " >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover absolute top-0 left-0"
              />
            </div>
            <div className="w-[60px] h-[60px] md:w-[76px] md:h-[80px] rounded-lg bg-[#F9F1E7] shadow-[0_4px_6px_0_#D9D9D9] relative overflow-hidden cursor-pointer " >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover absolute top-0 left-0"
              />
            </div>
            <div className="w-[60px] h-[60px] md:w-[76px] md:h-[80px] rounded-lg bg-[#F9F1E7] shadow-[0_4px_6px_0_#D9D9D9] relative overflow-hidden cursor-pointer " >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover absolute top-0 left-0"
              />
            </div>

          </div>

          <div className="  w-[330px] h-[370px] lg:w-[423px]  lg:h-[500px] bg-[#F9F1E7] rounded-[10px] relative overflow-hidden mx-auto ">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover absolute top-0 left-0"
            />

          </div>

        </div>




        {/* right side  */}
        <div className=" w-full max-w-[350px] lg:max-w-[606.1px] flex items-start flex-col gap-6 "  >

          {/* top part  */}
          <div className="w-full flex flex-col items-Start gap-4  " >
            <h1 className=" text-[#000000] font-normal text-[42px] "  >{product.name} </h1>
            <h3 className=" text-[#9F9F9F] text-2xl font-medium " >Rs. {product.price} </h3>

            <div className=" font-normal text-[#9F9F9F] text-[13px] flex w-fit items-center justify-between gap-5 " >rating  <span className="block h-[25px] w-[1px]  border-[1px] bg-[#9F9F9F] " ></span>    5 customer review </div>

            <p className=" text-[#000000] font-normal text-[13px] " >Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.

            </p>


            <div className="w-fit flex flex-col items-start gap-3  " >
              <p className=" text-[#9F9F9F] text-sm font-normal " >Size</p>
              <div className="w-fit flex flex-row items-center justify-start gap-5 ">

                {sizes.map((size, index) => (
                  <button onClick={() => chooseSize(size)} className={` w-[30px] h-[30px] rounded-[5px]   font-normal text-[13px] cursor-pointer ${selectedSize === size ? "bg-[#B88E2F] text-white " : "bg-[#F9F1E7] text-[#000000]"} `} key={index}> {size}  </button>
                ))}
              </div>
            </div>

            <div className="w-fit flex flex-row items-center justify-start gap-5 " >

              {availableColors.map((color, index) => (
                <button key={index} className="w-[30px] h-[30px] rounded-full cursor-pointer   " style={{ backgroundColor: color.name }}  >   </button>
              ))}

            </div>


            <div className="w-fit flex flex-row items-center justify-start gap-5 lg:gap-7 flex-wrap lg:flex-nowrap ">


              <div className="  w-[123px] border-[1px] border-[#9F9F9F] rounded-[10px] h-[64px] px-2 py-3 flex items-center justify-between gap-5 text-[#000000] font-medium text-base  " >

                <button onClick={decreaseAmount} className="flex items-center justify-center w-[20px] h-[20px] cursor-pointer "  ><Minus /></button>
                <p> {itemAmount} </p>
                <button onClick={increaseItemAmount} className="flex items-center justify-center w-[20px] h-[20px] cursor-pointer " ><Plus /></button>

              </div>

              <button className=" cursor-pointer w-[130px] lg:w-[215px] border-[1px] border-[#000000] rounded-[10px] h-[64px] px-2 py-3 flex items-center justify-center gap-5 text-[#000000] font-medium text-base text-center  " > Add To Cart  </button>
              <button className=" cursor-pointer w-[130px] lg:w-[215px] border-[1px] border-[#000000] rounded-[10px] h-[64px] px-2 py-3 flex items-center justify-center gap-5 text-[#000000] font-medium text-base text-center  " > <Plus /> Compare  </button>

            </div>

          </div>


          <hr className="w-full bg-[#D9D9D9] h-[1px] mt-[50px] mb-[30px] " />





          {/* bottom part  */}

          <div>
            <div className=" space-y-4 text-[#9F9F9F] text-base font-normal ">
              <div className="flex items-start gap-4">
                <span className="w-24 font-medium">SKU</span>
                <span>  <span className="mr-3" >:</span>SS001</span>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-24 font-medium">Category</span>
                <span><span className="mr-3" >:</span> Sofas</span>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-24 font-medium">Tags</span>
                <span><span className="mr-3" >:</span>  Sofa, Chair, Home, Shop</span>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-24 font-medium">Share</span>
                <span className="mr-3" >:</span>
                <span className="flex items-center gap-4">
                  <FacebookShareButton url={url} title="Check out this product"  >
                    <Facebook />
                  </FacebookShareButton>



                  <LinkedinShareButton title="Check out this product" url={url}>
                    <Linkedin className="text-black bg-white rounded-sm w-6 h-6 cursor-pointer" /></LinkedinShareButton>


                  <TwitterShareButton url={url} title="Check out this product" ><Twitter className="text-black bg-white rounded-full p-1 w-6 h-6 cursor-pointer" /></TwitterShareButton>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>







      <DetailedInfoSection
        detailed_description={product.detailed_description}
        image1={product.image_url}
      />

      <RelatedProducts
        category={product.category}
      />
    </div>
  );
};

export default ProductPage;
