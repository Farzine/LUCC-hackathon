'use client';
import React, { createContext, useState,useContext } from 'react';

// Create a new context
const DataContext = createContext();

// Custom hook to access the context value
export const useDataContext = () => useContext(DataContext);

// Context provider component
export const DataProvider = ({ children }) => {
//    Data state
    
    const [name, setname] = useState("Robin");
    const [ProfileComponet, setProfileComponet] = useState("meetingcalender");
    return (
        <DataContext.Provider value={{
        
            name, 
            setname,
            ProfileComponet,
             setProfileComponet,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext };