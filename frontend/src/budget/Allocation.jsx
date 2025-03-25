import React, { useState, useContext } from 'react';
import cats from './alloccats';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from "motion/react";
import { useVData } from '../Vcontext';
import './bankingstyles.css';

function Allocation() {
    const { vData, setV } = useVData();//get from context

    //for testing
    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const [suggest, setSuggest] = useState(false);
    const [suggestion, setSuggestion] = useState({});

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState(null); // State to store response data

    const [categories, setCategories] = useState(() => {
        const storedCats = localStorage.getItem('localAlloCats');
        return storedCats ? JSON.parse(storedCats) : cats;
    });

    const handleInputChange = (id, newValue) => {
        const newCategories = categories.map(category =>
            category.id === id ? { ...category, value: newValue } : category
        );
        setCategories(newCategories);
    };

    const addCategory = () => {
        const categoryName = prompt("Enter the new category name:");
        if (categoryName) {
            const newCategory = {
                id: categories.length + 1,
                name: categoryName.trim(),
                value: ''
            };
            setCategories([...categories, newCategory]);  // Ensures real-time update in UI
            localStorage.setItem('localAlloCats', JSON.stringify([...categories, newCategory]));
        }
    };

    const handleSubmit = () => {
        localStorage.clear();  // Consider changing when deploying actual app logic instead of clearing everything
        navigate('/Budget');
    };

    // Modified fetchData function to use POST and handle dataToSend properly
    const fetchData = async (dataToSend) => {
        try {
            const response = await fetch('http://localhost:3001/Budget/Allocation', {
                method: 'POST',  // Using POST as defined in your backend
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setData(responseData);  // Store the entire response data
            return responseData;  // Return the data for immediate use
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    const checkInputs = async (event) => {
        event.preventDefault();
        const sum = categories.reduce((sum, category) => sum + Number(category.value), 0);
        if (sum != 100) {
            alert("Your selection doesn't add up to 100!");
        } else {
            setLoading(true);
            try {
                const dataToSend = {
                    categories: categories,  // Send the actual categories data
                    additionalInfo: "User allocation data"
                };

                const responseData = await fetchData(dataToSend);
                //get data that we send to App.jsx to then send Budget.jsx
                setV(responseData);
                console.log("Server response:", responseData);

                await timeout(1000);//example delay from server

                if(true){//check active suggestions
                    setSuggest(true);
                    setSuggestion({test: 1});
                }

                await timeout(10000);
                handleSubmit();
            } catch (error) {
                console.error('Data loading failed:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <p>Enter (percentage) allocation amounts.</p>
            <hr className="ahr"></hr>
            <div className='suggestions'>
                <div className='formControl'>
                    <form onSubmit={checkInputs} className='form'>
                        {categories.map((category) => (
                            <div key={category.id}>
                                <label className='lStyle'>
                                    {category.name}:
                                    <input
                                        type="number"
                                        value={category.value}
                                        onChange={(e) => handleInputChange(category.id, e.target.value)}
                                    />
                                </label>
                                <br />
                            </div>
                        ))}
                        <div className='co'>
                            <div className="buttonContainer">
                                <motion.button type="button" onClick={() => navigate('/Budget/Banking')} className='buttons'
                                    whileHover={{ scale: 1.1 }}>
                                    Back
                                </motion.button>
                                <motion.button type="button" onClick={addCategory} className='buttons'
                                    whileHover={{ scale: 1.1 }}>
                                    Add Category
                                </motion.button>
                                <motion.button type="submit" className='buttons'
                                    whileHover={{ scale: 1.1 }}>
                                    Submit Data
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={suggest ? 'suggest' : 'remove'}><p>{JSON.stringify(suggestion.test)}</p></div>
            </div>
            <div className='loading'>
                {loading && (<object className='loadingCircles' type="image/svg+xml" data="/circleloadingsm.svg">Your browser does not support SVG</object>)}
            </div>
        </>
    );
}

export default Allocation;