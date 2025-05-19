"use client"

import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/SupabaseAuth"
import { supabase } from "utils/supabaseClient"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'
import { useFurniroContext } from "context/FurniroContext"
import Link from "next/link"

export default function ProfileDropdown() {
  const { userId } = useFurniroContext()
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setUserName("")
        setIsLoading(false)
        return
      }

      try {
        // First try to get the user data from auth.getUser()
        const { data: userData } = await supabase.auth.getUser()

        if (userData?.user?.user_metadata?.name) {
          setUserName(userData.user.user_metadata.name)
          setIsLoading(false)
          return
        }

        // If name not in metadata, try to get it from profiles table
        const { data, error } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", userId)
          .single()

        if (error) {
          console.error("Error fetching user profile:", error)
          setUserName("User")
        } else if (data) {
          setUserName(data.name || "User")
        }
      } catch (error) {
        console.error("Unexpected error fetching user profile:", error)
        setUserName("User")
      }

      setIsLoading(false)
    }

    fetchUserProfile()
  }, [userId])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (!userId || isLoading) {
    return null // Don't render anything if not logged in or still loading
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{userName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={"/checkout"}> <DropdownMenuItem  >View profile</DropdownMenuItem></Link>
        <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}