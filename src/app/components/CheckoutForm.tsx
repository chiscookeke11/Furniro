"use client"


import React, { useState } from "react";
import Input from "./ui/Input";



export default function CheckoutForm () {

    const [checkoutFormValues, setCheckoutFormValues] = useState({
firstName: "",
lastName: "",
companyName: "",
country: "",
streetAddress: "",
city: "",
zipCode: "",
phoneNumber: "",
emailAddress: "",
additionalInfo: ""
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        const {name, value} = e.target;
        setCheckoutFormValues((prev) => ({
            ...prev,
            [name] : value
        }))
    }


    return(
        <form action="" className=" w-full font-poppins flex flex-row items-start justify-between gap-6 " >



            <div className=" max-w-[608px] flex flex-col gap-6 " >
<h1>Billing details</h1>

            <div  className="w-full flex gap-4 " >
                <Input
                className=""
                errorMessage=""
                inputId="firstName"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                placeholder=""
                type="text"
                value={checkoutFormValues.firstName}
                required
                />

                <Input
                className=""
                errorMessage=""
                inputId="lastName"
                label="Last Name"
                name="lastName"
                placeholder=""
                type="text"
                onChange={handleChange}
                value={checkoutFormValues.lastName}
                required
                 />

            </div>

            <Input
            className=""
            errorMessage=""
            inputId="companyName"
            label="Company Name (Optional)"
            name="companyName"
            onChange={handleChange}
            placeholder=""
            type="text"
            value={checkoutFormValues.companyName}
          required={false}

            />





            <Input
            className=""
          errorMessage=""
          inputId="streetAddress"
          label="Street address"
          name="streetAddress"
          onChange={handleChange}
          required
          placeholder=""
          type="text"
          value={checkoutFormValues.streetAddress}
             />



    <Input
            className=""
          errorMessage=""
          inputId="city"
          label="Town / City"
          name="city"
          onChange={handleChange}
          required
          placeholder=""
          type="text"
          value={checkoutFormValues.city}
             />


    <Input
            className=""
          errorMessage=""
          inputId="zipCode"
          label="ZIP Code"
          name="zipCode"
          onChange={handleChange}
          required
          placeholder=""
          type="text"
          value={checkoutFormValues.zipCode}
             />

 <Input
            className=""
          errorMessage=""
          inputId="phoneNumber"
          label="Phone"
          name="phoneNumber"
          onChange={handleChange}
          required
          placeholder=""
          type="text"
          value={checkoutFormValues.phoneNumber}
             />


              <Input
            className=""
          errorMessage=""
          inputId="emailAddress"
          label="Email address"
          name="emailAddress"
          onChange={handleChange}
          required
          placeholder=""
          type="email"
          value={checkoutFormValues.phoneNumber}
             />


 <Input
            className=""
          errorMessage=""
          inputId="additionalInfo"
          label=""
          name="additionalInfo"
          onChange={handleChange}
          required
          placeholder="Additional Information"
          type="text"
          value={checkoutFormValues.additionalInfo}
             />


            </div>


            <div className=" w-full max-w-[608px] flex flex-col items-center   " >
                <div className="w-full flex items-center justify-between gap-5" >
                    <h2>Product</h2>
                    <h2>Subtotal</h2>

                </div>

                <div className="w-full flex items-center justify-between gap-5">
                    <h3>Asgarrrd Sofa x 1 </h3>
                    <h3>Rs. 250000000 </h3>
                </div>

                <div className="w-full flex items-center justify-between gap-5">
                    <h3>Subtotal</h3>
                    <h3>Rs. 250,000.00 </h3>
                </div>


  <div className="w-full flex items-center justify-between gap-5">
                    <h3>Total</h3>
                    <h3>Rs. 250,000.00</h3>
                </div>

                <div className="w-full flex flex-col items-start" >


<label>
       <input type="radio" name="payment-method" id="bank transfer" />
<small>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</small>
</label>


                </div>




<button className="text-[#000000] text-lg md:text-xl font-normal w-[150px] md:w-[318px] border-[1px] border-[#000000] rounded-[8px] md:rounded-[15px] h-[48px] md:h-[58.95px] cursor-pointer ">
    Place Order
</button>
            </div>




        </form>
    )
}