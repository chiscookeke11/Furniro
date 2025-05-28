"use client"

import type React from "react"

import { useState } from "react"
import Input from "./ui/Input"
import Loader from "./ui/Loader"
import { signIn, signInWithGoogle, signUp } from "@/lib/SupabaseAuth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AuthForm() {
  const [authMode, setAuthMode] = useState<"Sign In" | "Sign Up">("Sign In")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validate name (only for Sign Up)
    if (authMode === "Sign Up" && !formValues.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    // Validate email
    if (!formValues.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    // Validate password
    if (!formValues.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (authMode === "Sign Up" && formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      if (authMode === "Sign Up") {
        const { error, data: signUpData } = await signUp(formValues.name, formValues.email, formValues.password)

        if (error) {
          toast.error(error.message || "Sign up failed!")
        } else if (signUpData?.session) {
          toast.success("Sign up successful!")
          router.push("/")
        } else if (signUpData?.user) {
          // This code should be moved to the signUp function in SupabaseAuth.ts
          // as it requires the supabase client which isn't imported here
          toast.info("Please confirm your email")
        }
      } else {
        // Sign In functionality
        const { error, data } = await signIn(formValues.email, formValues.password)

        if (error) {
          toast.error(error.message || "Sign in failed!")
        } else if (data?.session) {
          toast.success("Sign in successful!")
          router.push("/")
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === "Sign In" ? "Sign Up" : "Sign In")
    // Clear errors when switching modes
    setErrors({ name: "", email: "", password: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[635px] flex flex-col items-center bg-white gap-5 px-5 py-8">
      <h1 className="font-bold text-[40px] text-[#B88E2F]">{authMode}</h1>

      {authMode === "Sign Up" && (
        <Input
          inputId="name"
          label="Name"
          name="name"
          type="text"
          required={true}
          placeholder="Enter Fullname"
          value={formValues.name}
          onChange={handleChange}
          className=""
          errorMessage={errors.name}
        />
      )}

      <Input
        inputId="email"
        label="Email"
        name="email"
        type="email"
        required={true}
        placeholder="Enter Email"
        value={formValues.email}
        onChange={handleChange}
        className=""
        errorMessage={errors.email}
      />

      <Input
        inputId="password"
        label="Password"
        name="password"
        type="password"
        required={true}
        placeholder="Enter Password"
        value={formValues.password}
        onChange={handleChange}
        className=""
        errorMessage={errors.password}
      />

      <p className="ml-auto cursor-pointer text-sm font-medium text-[#B88E2F]"> <Link href={"/auth/forget-password"} >Forgot Password?</Link></p>

      <button
        type="submit"
        className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : authMode}
      </button>




      {authMode === "Sign In" ? (
        <p onClick={toggleAuthMode} className="cursor-pointer text-sm font-medium text-[#000000] mt-5">
          Don&apos;t have an account? <span className="text-[#B88E2F]">Create Account</span>
        </p>
      ) : (
        <p onClick={toggleAuthMode} className="cursor-pointer text-sm font-medium text-[#000000] mt-5">
          Already have an account? <span className="text-[#B88E2F]">Sign In</span>
        </p>
      )}
      <button className="cursor-pointer" onClick={signInWithGoogle} type="button" >Sign in With google</button>
    </form>
  )
}
