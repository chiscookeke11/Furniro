"use client"

import axios from "axios";
import { Furniture } from "interfaces/FurnitureInterface";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "utils/supabaseClient";

// Proper context type
interface FurniroContextType {
  tableData: Furniture[];
  setTableData: React.Dispatch<React.SetStateAction<Furniture[]>>;
  loading: boolean;
  error: boolean;
  optionValue: string;
  setOptionValue: React.Dispatch<React.SetStateAction<string>>;
  setLoading:  React.Dispatch<React.SetStateAction<boolean>>;
  tokenPrice: number | undefined;
      setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
      showCart: boolean;
}

// Provider props
interface FurniroContextProviderProps {
  children: ReactNode;
}

// Create context
const FurniroContext = createContext<FurniroContextType | undefined>(undefined);

// Provider component
export const FurniroContextProvider: React.FC<FurniroContextProviderProps> = ({ children }) => {
  const [tableData, setTableData] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState("Default");
  const [tokenPrice, setTokenPrice] = useState<number>();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchFurnitureData = async () => {

      let query = supabase.from('furniture').select('*');

      if (optionValue.toLowerCase() !== "default") {
        query = query.eq('category', optionValue);
      }


      const { data, error } = await query;

      if (error) {
        console.error('Error fetching data:', error);
        setTableData([]);
        setError(true);
      } else if (data) {
        setTableData(data);
        setError(false);
      }

      setLoading(false);
    };

    fetchFurnitureData();
  }, [optionValue]);



  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=starknet&vs_currencies=idr")
    .then((response) => {
      const price = response.data?.starknet?.idr;
      if (price) {
        setTokenPrice(price);
      } else {
        console.error("Token price not found");
      }
    })
    .catch((error) => console.error("Error fetching token price:", error));

  }, [])

















  return (
    <FurniroContext.Provider value={{ tableData, setTableData, loading, setLoading, error, optionValue, setOptionValue, tokenPrice, showCart, setShowCart }}>
      {children}
    </FurniroContext.Provider>
  );
};

// Custom hook
export const useFurniroContext = () => {
  const context = useContext(FurniroContext);
  if (!context) {
    throw new Error("useFurniroContext must be used within a FurniroContextProvider");
  }
  return context;
};
