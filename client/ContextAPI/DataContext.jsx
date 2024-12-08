'use client';
import React, { createContext, useState,useContext } from 'react';

// Create a new context
const DataContext = createContext();

// Custom hook to access the context value
export const useDataContext = () => useContext(DataContext);

// Context provider component
export const DataProvider = ({ children }) => {
//    Data state
    const data = 'Hello, world!';
    const doSomething = () => {
        console.log('Doing something...');
    };
    const [name, setname] = useState("Robin");

    return (
        <DataContext.Provider value={{
            data,
            doSomething,
            name, 
            setname,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext };