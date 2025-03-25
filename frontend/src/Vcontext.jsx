import React, { createContext, useState, useContext } from 'react';

// Create the context
const VDataContext = createContext();

// Export the provider as its own component
export const VDataProvider = ({ children }) => {
    const [vData, setVData] = useState(null);
    
    const setV = (v) => {
        setVData(v);
    };

    const value = { vData, setV };

    return (
        <VDataContext.Provider value={value}>
            {children}
        </VDataContext.Provider>
    );
};

// Custom hook to use the context
export const useVData = () => useContext(VDataContext);