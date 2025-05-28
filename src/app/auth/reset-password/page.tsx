"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Input from "app/components/ui/Input"
import { supabase } from "utils/supabaseClient"
import Loader from "app/components/ui/Loader"
import { toast } from "sonner"
import { updateUserPassword } from "@/lib/SupabaseAuth"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [sessionChecked, setSessionChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!data.session) {
        toast.error("You must access this page through the reset email link.")
        // Optionally redirect to login page
        // router.push('/login');
      }
      setSessionChecked(true)
    }
    checkSession()
  }, [])

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match")
      return false
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      )
      return false
    }

    return true
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const isValid = validatePassword()
    if (!isValid) {
      setIsLoading(false)
      return
    }

    try {
      const result = await updateUserPassword(newPassword)

      if (result.success) {
        setNewPassword("")
        setConfirmPassword("")
        toast.success("Password updated successfully!")
        // Optionally redirect to dashboard or login
        // router.push('/dashboard');
      } else {
        setError(result.error || "Password update failed. Try again.")
        toast.error("Password update failed")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!sessionChecked) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-[#FCF8F3]">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-center flex-col py-7 px-5 bg-[#FCF8F3] font-poppins min-h-screen">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-[635px] flex flex-col items-center bg-white gap-5 px-5 py-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h1>

        <Input
          label="New Password"
          name="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          type="password"
          inputId="password"
          className=""
          errorMessage=""
          placeholder="Enter your new password"
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          type="password"
          inputId="confirmPassword"
          className=""
          errorMessage=""
          placeholder="Confirm your new password"
        />

        {error && (
          <div className="w-full">
            <p className="text-red-500 text-sm text-center">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#A67C2A] transition-colors"
          disabled={isLoading || !newPassword || !confirmPassword}
        >
          {isLoading ? <Loader /> : "Update Password"}
        </button>
      </form>
    </div>
  )
}
