"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "utils/supabaseClient"

export default function Page() {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password
    })

    setLoading(false)

    if (error) {
      console.error("Login error:", error.message)
      setError(error.message)
    } else {
      console.log("Login success:", data)
      router.push("/dashboard") // or your intended route
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleLogin()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col bg-black p-4 text-white">
      <input
        onChange={handleChange}
        value={formValues.email}
        name="email"
        type="text"
        placeholder="Email"
        className="w-full h-12 border border-gray-300 rounded-md px-4 mb-4 text-black"
      />
      <input
        onChange={handleChange}
        value={formValues.password}
        name="password"
        type="password"
        placeholder="Password"
        className="w-full h-12 border border-gray-300 rounded-md px-4 mb-4 text-black"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black py-2 rounded font-bold"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}
