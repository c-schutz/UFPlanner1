import React, { createContext, useState, useContext } from 'react';

// Create the context
const VDataContext = createContext();

// Export the provider as its own component
export const VDataProvider = ({ children }) => {
    const [vData, setVData] = useState(null);
    const [logged, setLogged] = useState(false); // State for user logged status

    // Function to set vData
    const setV = (v) => {
        setVData(v);
    };

    // Update context value
    // Adding logged and setLogged to the provided context values
    const value = { 
        vData, 
        setV, 
        logged,      // Provide logged state
        setLogged    // Provide function to modify logged state
    };

    return (
        <VDataContext.Provider value={value}>
            {children}
        </VDataContext.Provider>
    );
};

// Custom hook to use the context
export const useVData = () => useContext(VDataContext);