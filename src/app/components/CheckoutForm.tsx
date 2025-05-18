"use client"

import type React from "react"
import { type FormEvent, useEffect, useMemo, useState } from "react"
import Input from "./ui/Input"
import countryList from "react-select-country-list"
import Select from "react-select"
import { supabase } from "utils/supabaseClient"
import { toast } from "sonner"
import Loader from "./ui/Loader"


type CountryOption = {
  label: string
  value: string
}

type CheckoutFormValues = {
  firstName: string
  lastName: string
  companyName: string
  country: string
  streetAddress: string
  city: string
  zipCode: string
  phoneNumber: string
  emailAddress: string
  additionalInfo: string
  paymentMethod: string
}

type PaymentMethodOption = {
  method: string
  explanation: string
}

export default function CheckoutForm() {
  const [checkoutFormValues, setCheckoutFormValues] = useState<CheckoutFormValues>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    emailAddress: "",
    additionalInfo: "",
    paymentMethod: "",
  })
  const [userId, setUserId] = useState<string | null>(null)
  const [isProfileFilled, setIsProfileFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const userId = user?.id ?? null
      setUserId(userId)

      if (userId) {
        const { data, error } = await supabase.from("billing_details").select("*").eq("id", userId)

        if (error || !data || data.length === 0) {
          console.log("Error fetching or no billing data")
          setIsProfileFilled(false)
        } else {
          console.log("User profile data", data)
          const userData = data[0]
          setIsProfileFilled(true)
          setCheckoutFormValues({
            firstName: userData.first_name,
            lastName: userData.last_name,
            companyName: userData.company_name,
            country: userData.country_name,
            streetAddress: userData.street_address,
            city: userData.town,
            zipCode: userData.zip_code,
            phoneNumber: userData.phone,
            emailAddress: userData.email_address,
            additionalInfo: userData.additional_info,
            paymentMethod: userData.payment_method,
          })
        }
      }
    }

    fetchUserAndProfile()
  }, [])

  const countryOptions = useMemo<CountryOption[]>(() => countryList().getData(), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if ((name === "phoneNumber" || name === "zipCode") && !/^\d*\.?\d*$/.test(value)) {
      return
    }

    setCheckoutFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const paymentMethod: PaymentMethodOption[] = [
    {
      method: "Direct Bank Transfer",
      explanation:
        "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
    },
    {
      method: "Cash On Delivery",
      explanation:
        "Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.",
    },
    {
      method: "Pay with bank card",
      explanation: "",
    },
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    console.log(checkoutFormValues)

    if (!userId) {
      console.log("No user ID available")
      return
    }

    // Check if profile already exists to determine if we should update or insert
    if (isProfileFilled) {
      // Update existing record
      const { error } = await supabase
        .from("billing_details")
        .update({
          first_name: checkoutFormValues.firstName,
          last_name: checkoutFormValues.lastName,
          company_name: checkoutFormValues.companyName,
          country_name: checkoutFormValues.country,
          street_address: checkoutFormValues.streetAddress,
          town: checkoutFormValues.city,
          zip_code: checkoutFormValues.zipCode,
          phone: checkoutFormValues.phoneNumber,
          email_address: checkoutFormValues.emailAddress,
          additional_info: checkoutFormValues.additionalInfo,
          payment_method: checkoutFormValues.paymentMethod,
        })
        .eq("id", userId)

      if (error) {
         setIsLoading(false)
        console.log("Error updating billing details", error)
      } else {
         setIsLoading(false)
        toast.success("Billing details updated successfully")
      }
    } else {
      // Insert new record
      const {  error } = await supabase.from("billing_details").insert({
        id: userId,
        first_name: checkoutFormValues.firstName,
        last_name: checkoutFormValues.lastName,
        company_name: checkoutFormValues.companyName,
        country_name: checkoutFormValues.country,
        street_address: checkoutFormValues.streetAddress,
        town: checkoutFormValues.city,
        zip_code: checkoutFormValues.zipCode,
        phone: checkoutFormValues.phoneNumber,
        email_address: checkoutFormValues.emailAddress,
        additional_info: checkoutFormValues.additionalInfo,
        payment_method: checkoutFormValues.paymentMethod,
      })

      if (error) {
         setIsLoading(false)
        console.log("Error uploading billing details", error)
      } else {
         setIsLoading(false)
        toast.success("Billing details added successfully")
        setIsProfileFilled(true)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full font-poppins flex flex-col md:flex-row items-start justify-between gap-6 py-20 px-[8%]"
    >
      <div className="w-full max-w-[608px] flex flex-col gap-6">
        <h1 className="text-[#000000] text-3xl md:text-4xl font-semibold">Billing details</h1>

        <div className="w-full flex gap-10">
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

        <Select
          options={countryOptions}
          value={countryOptions.find((option) => option.label === checkoutFormValues.country)}
          onChange={(selectedOption: CountryOption | null) => {
            setCheckoutFormValues((prev) => ({
              ...prev,
              country: selectedOption?.label || "",
            }))
          }}
          name="country"
          className="basic-single"
          classNamePrefix="select"
          placeholder="Select Country"
          required
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
          value={checkoutFormValues.emailAddress}
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

      <div className="w-full max-w-[608px] flex flex-col items-center gap-5">
        <div className="w-full flex items-center justify-between gap-5">
          <h2 className="text-lg md:text-2xl text-[#000000] font-medium">Product</h2>
          <h2 className="text-lg md:text-2xl text-[#000000] font-medium">Subtotal</h2>
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          <h3 className="text-[#9F9F9F] text-sm md:text-base font-normal">
            Asgarrrd Sofa <span className="text-xs font-medium ml-2"> x 1</span>
          </h3>
          <h3 className="text-[#000000] text-sm md:text-base font-light">Rs. 250,000.00</h3>
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          <h3 className="text-[#000000] text-sm md:text-base font-normal">Subtotal</h3>
          <h3 className="text-[#000000] text-sm md:text-base font-light">Rs. 250,000.00</h3>
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          <h3 className="text-[#000000] text-sm md:text-base font-normal">Total</h3>
          <h3 className="text-xl md:text-2xl text-[#B88E2F] font-bold">Rs. 250,000.00</h3>
        </div>

        <div className="w-full flex flex-col items-start">
          <div className="flex flex-col gap-3 items-start w-full border-t-[1px] border-[#D9D9D9] py-5 mt-5 text-sm">
            {paymentMethod.map((method, index) => (
              <label key={index} htmlFor={`payment-${index}`} className="w-full gap-2 flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  id={`payment-${index}`}
                  value={method.method}
                  checked={checkoutFormValues.paymentMethod === method.method}
                  onChange={(e) => {
                    setCheckoutFormValues((prev) => ({
                      ...prev,
                      paymentMethod: e.target.value,
                    }))
                  }}
                  required={index === 0}
                />
                <div className="flex flex-col items-start">
                  {method.method}
                  {method.explanation && <small>{method.explanation}</small>}
                </div>
              </label>
            ))}
          </div>
        </div>

        <button className="text-[#000000] text-lg md:text-xl font-normal w-[150px] md:w-[318px] border-[1px] border-[#000000] rounded-[8px] md:rounded-[15px] h-[48px] md:h-[58.95px] cursor-pointer font-poppins">
          {isProfileFilled ? isLoading ? <Loader/> : "Update"  : isLoading ? <Loader/> : "Place Order"}
        </button>
      </div>
    </form>
  )
}
