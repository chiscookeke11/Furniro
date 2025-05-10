"use client"



// import { useState } from "react";
import Input from "./ui/Input";
// import Loader from "./ui/Loader";





export default function FurnitureUploadForm() {
  // const [isUploading, setIsUploading] = useState<boolean>(false);



    return (
        <form action=""      className="w-full max-w-[635px] flex flex-col items-start gap-5 p-1">

            <Input className="" errorMessage="" inputId="furnitureName" label="Name" name="furnitureName" placeholder="Enter furniture name" type="text" required onChange={() => console.log("changes")  } value="furniturre name"   />



            <Input className="" errorMessage="" inputId="description" label="Brief Description" name="description" placeholder="Write a brief description" type="text" required onChange={() => console.log("changes")  } value="description"   />


            <Input className="" errorMessage="" inputId="price" label="Price" name="price" placeholder="Enter furniture price" type="number" required onChange={() => console.log("changes")  } value= {100}   />





            <Input className="" errorMessage="" inputId="newPrice" label="Discount Price" name="newPrice" placeholder="Enter discount price" type="number" required onChange={() => console.log("changes")  } value={50}   />



            <Input className="" errorMessage="" inputId="detailedDescription" label="Detailed description" name="detailedDescription" placeholder="Enter a detailed description" type="text" required onChange={() => console.log("changes")  } value="detailed description"   />




  <button
        type="submit"
        className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal disabled:bg-gray-400"
        // disabled={isUploading}
      >
        {/* {isUploading ? <Loader/> : "Upload"} */}
      </button>

        </form>
    )
}