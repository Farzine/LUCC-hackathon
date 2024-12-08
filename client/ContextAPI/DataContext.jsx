'use client';
import React, { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
usePathname;

// Create the DataContext
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  // refresh token
  useEffect(() => {
    const refreshToken = async () => {
      try {
        // Call the refresh token API
        await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/refreshtoken`,
          { withCredentials: true } // Allow cookies to be sent and received
        );
        console.log("Token refreshed");
        await fetchSession();
      } catch (error) {
        console.error("Failed to refresh token", error);
      }
    };

    // Call refreshToken once when the component mounts (page refresh)

    refreshToken();
  }, []);


  const fetchSession = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        { withCredentials: true }
      );

      await setUser(response.data.user);
    } catch (error) {
      console.error("Login to get session", error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

 
  return (
    <DataContext.Provider
      value={{
        user, setUser
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };