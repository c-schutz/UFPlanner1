import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const VDataContext = createContext();

// Export the provider as its own component
export const VDataProvider = ({ children }) => {
    const [vData, setVData] = useState(null);
    // Initialize the logged state from sessionStorage
    const [logged, setLogged] = useState(() => {
        // Retrieve the logged state from sessionStorage if available
        const loggedState = sessionStorage.getItem('logged');
        return loggedState === 'true' ? true : false;
    });

    // Function to set vData
    const setV = (v) => {
        setVData(v);
    };

    // Effect to store logged state in sessionStorage when it changes
    useEffect(() => {
        sessionStorage.setItem('logged', logged);
        // if(!logged){ //must have changed from true to false so clear sessionStorage
        //     sessionStorage.clear('budgets');
        // }
    }, [logged]);

    // Update context value
    const value = { 
        vData, 
        setV, 
        logged,     // Provide logged state
        setLogged   // Provide function to modify logged state
    };

    return (
        <VDataContext.Provider value={value}>
            {children}
        </VDataContext.Provider>
    );
};

// Custom hook to use the context
export const useVData = () => useContext(VDataContext);