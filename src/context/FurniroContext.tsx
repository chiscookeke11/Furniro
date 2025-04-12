"use client"

import { Furniture } from "interfaces/FurnitureInterface";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "utils/supabaseClient";

// Proper context type
interface FurniroContextType {
  tableData: Furniture[];
  setTableData: React.Dispatch<React.SetStateAction<Furniture[]>>;
  loading: boolean;
  error: boolean;
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

  useEffect(() => {
    const fetchFurnitureData = async () => {
      const { data, error } = await supabase.from('furniture').select('*');

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
  }, []);

  return (
    <FurniroContext.Provider value={{ tableData, setTableData, loading, error }}>
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
