"use client"

import { useState } from "react";
import Input from "./ui/Input";






export default function BlogCategoryFilter() {


    const buttons = [
        {
            label: "Crafts",
            amount: "2",
        },
        {
            label: "Design",
            amount: "8",
        },
        {
            label: "Handmade",
            amount: "7",
        },
        {
            label: "Interior",
            amount: "1",
        },
        {
            label: "Wood",
            amount: "6",
        },

    ]


    const [searchValues, setSearchValues] =  useState({search: ""})

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setSearchValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };




    return (
        <div className=" w-full flex flex-col items-center gap-7 font-poppins " >
            <Input
            onChange={handleChange}
            type="search"
            placeholder="Search ..."
            name="search"
            inputId="search"
            label=""
            value={searchValues.search}
            errorMessage=""
            required={true}
            />



            <div className="w-full  max-w-[251px] mx-auto  flex flex-col gap-2 " >

            <h2 className=" text-[#000000] text-2xl font-medium  " > Categories</h2>

                {buttons.map((button, index) => (
                    <button key={index} className="w-full  flex items-center justify-between cursor-pointer text-base font-normal text-[#9F9F9F] py-3 " > <p> {button.label} </p> <p>{button.amount} </p> </button>
                ))}



            </div>
        </div>
    )
}