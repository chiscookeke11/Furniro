"use client"


import { Furniture } from "interfaces/FurnitureInterface"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { supabase } from "utils/supabaseClient"

// Proper context type
interface FurniroContextType {
  tableData: Furniture[]
  setTableData: React.Dispatch<React.SetStateAction<Furniture[]>>
  loading: boolean
  error: boolean
  optionValue: string
  setOptionValue: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  showCart: boolean
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>
  role: string
  userId: string | null
}

// Provider props
interface FurniroContextProviderProps {
  children: ReactNode
}

// Create context
const FurniroContext = createContext<FurniroContextType | undefined>(undefined)

// Provider component
export const FurniroContextProvider: React.FC<FurniroContextProviderProps> = ({ children }) => {
  const [tableData, setTableData] = useState<Furniture[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [optionValue, setOptionValue] = useState("Default")
  const [showCart, setShowCart] = useState(false)
  const [role, setRole] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // When auth state changes (sign in, sign out, etc.)
        if (session && session.user) {
          // User is logged in
          setUserId(session.user.id)

          // Fetch user role
          const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single()

          if (data?.role) {
            setRole(data.role)
          } else {
            setRole("")
          }

          if (error) {
            console.log("Error fetching role:", error)
          }
        } else {
          // User is logged out
          setUserId(null)
          setRole("")
        }
      }
    )

    // Initial check for current session
    const checkCurrentSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session && session.user) {
        setUserId(session.user.id)

        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (data?.role) {
          setRole(data.role)
        }

        if (error) {
          console.log("Error fetching role:", error)
        }
      } else {
        setUserId(null)
        setRole("")
      }
    }

    checkCurrentSession()

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const fetchFurnitureData = async () => {
      let query = supabase.from("furniture").select("*")

      if (optionValue.toLowerCase() !== "default") {
        query = query.eq("category", optionValue)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching furniture data:", error)
        setTableData([])
        setError(true)
      } else if (data) {
        setTableData(data)
        setError(false)
      }

      setLoading(false)
    }

    fetchFurnitureData()
  }, [optionValue])



  return (
    <FurniroContext.Provider
      value={{
        tableData,
        setTableData,
        loading,
        setLoading,
        error,
        optionValue,
        setOptionValue,
        showCart,
        setShowCart,
        role,
        userId,
      }}
    >
      {children}
    </FurniroContext.Provider>
  )
}

// Custom hook
export const useFurniroContext = () => {
  const context = useContext(FurniroContext)
  if (!context) {
    throw new Error("useFurniroContext must be used within a FurniroContextProvider")
  }
  return context
}