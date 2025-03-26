import React, { useState, useContext } from 'react';
import cats from './alloccats';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from "motion/react";
import { useVData } from '../Vcontext';
import './bankingstyles.css';

function Allocation() {
    const [submitting, setSubmitting] = useState(false);
    const { vData, setV } = useVData();//get from context
    const { logged, setLogged } = useVData();

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
        const storedCats = sessionStorage.getItem('localAlloCats');
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
            sessionStorage.setItem('localAlloCats', JSON.stringify([...categories, newCategory]));
        }
    };

    const handleSubmit = () => {
        //sessionStorage.clear(); Consider changing when deploying actual app logic instead of clearing everything
        navigate('/Budget');
        //buttons can activate again after navigation occurs
        setSubmitting(false);
    };
    //helper used to check if something is in JSON format or not
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // Modified fetchData function to use POST and handle dataToSend properly
    const fetchData = async (dataToSend) => {
        //console.log(dataToSend);
        try {
            const response = await fetch('http://localhost:3001/Budget/Allocation', {
                method: 'POST',  // Using POST as defined in your backend
                headers: {
                    'Content-Type': 'application/json'
                },
                body: dataToSend
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
            //disable buttons because form is being submitted
            setSubmitting(true);
            sessionStorage.setItem('currentadata', JSON.stringify(categories))

            //change functionality based upon whether user is logged or not
            if (logged) {

                console.log("User is logged in send to backend");
                //create fake budgetID/update if user isn't logged in
                let bID = JSON.parse(sessionStorage.getItem('currentBID'));
                if (bID == null) { //this is the first budget they are creating
                    sessionStorage.setItem('currentBID', 1);
                    bID = 1;
                } else {
                    sessionStorage.setItem('currentBID', parseInt(bID, 10) + 1);
                }


                console.log("User isn't logged in concatenate in sessionStorage");
                let qData = JSON.parse(sessionStorage.getItem('currentqdata'));
                let bData = JSON.parse(sessionStorage.getItem('currentbdata'));
                let aData = JSON.parse(sessionStorage.getItem('currentadata'));

                let fullData = {
                    budgetID: bID,
                    questionnaire: qData,
                    banking: bData,
                    allocation: aData
                };


                setLoading(true);
                try {
                    const data = {
                        data: fullData, 
                        isLoggedIn: true
                    };
                    const dataToSend = JSON.stringify(data);
                    console.log(dataToSend);

                    const responseData = await fetchData(dataToSend);
                    console.log(responseData);

                    await timeout(2000);//example delay from server

                    if (true) {//check active suggestions
                        setSuggest(true);
                        setSuggestion({ test: 1 });
                    }

                    handleSubmit();
                } catch (error) {
                    console.error('Data loading failed:', error);
                } finally {
                    setLoading(false);
                }
                handleSubmit();
            } else {
                //create fake budgetID/update if user isn't logged in
                let bID = JSON.parse(sessionStorage.getItem('currentBID'));
                if (bID == null) { //this is the first budget they are creating
                    sessionStorage.setItem('currentBID', 1);
                    bID = 1;
                } else {
                    sessionStorage.setItem('currentBID', parseInt(bID, 10) + 1);
                }


                console.log("User isn't logged in concatenate in sessionStorage");
                let qData = JSON.parse(sessionStorage.getItem('currentqdata'));
                let bData = JSON.parse(sessionStorage.getItem('currentbdata'));
                let aData = JSON.parse(sessionStorage.getItem('currentadata'));

                let fullData = {
                    budgetID: bID,
                    questionnaire: qData,
                    banking: bData,
                    allocation: aData
                };
                let name = 'budgets';//name of where all the budgets will be stored

                //check if there are budgets already and either add or create the first
                if (sessionStorage.getItem(name) == null) { //first item
                    sessionStorage.setItem(name, JSON.stringify([fullData]));
                } else { //add to the budgets
                    let budgets = JSON.parse(sessionStorage.getItem(name));
                    budgets.push(fullData);
                    sessionStorage.setItem(name, JSON.stringify(budgets));
                }

                setLoading(true);
                try {
                    const data = { //send the full budget data and tell backend that user isn't logged
                        data: JSON.parse(sessionStorage.getItem(name)), //already in JSON.stringify() format
                        isLoggedIn: false
                    };
                    const dataToSend = JSON.stringify(data);
                    // if(isJson(dataToSend)){
                    //     console.log("Should work");
                    // }

                    const responseData = await fetchData(dataToSend);
                    //get data that we send to App.jsx to then send Budget.jsx
                    // setV(responseData);
                    // console.log("Server response:", responseData);
                    sessionStorage.setItem('svgData', JSON.stringify(responseData.svgs));

                    await timeout(2000);//example delay from server

                    if (true) {//check active suggestions
                        setSuggest(true);
                        setSuggestion({ test: 1 });
                    }

                    handleSubmit();
                } catch (error) {
                    console.error('Data loading failed:', error);
                } finally {
                    setLoading(false);
                }
            }
            /*
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

                await timeout(2000);//example delay from server

                if (true) {//check active suggestions
                    setSuggest(true);
                    setSuggestion({ test: 1 });
                }

                handleSubmit();
            } catch (error) {
                console.error('Data loading failed:', error);
            } finally {
                setLoading(false);
            }
            */
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
                                <motion.button type="button" onClick={() => navigate('/Budget/Banking')} className='buttons' disabled={submitting}
                                    whileHover={{ scale: 1.1 }}>
                                    Back
                                </motion.button>
                                <motion.button type="button" onClick={addCategory} className='buttons' disabled={submitting}
                                    whileHover={{ scale: 1.1 }}>
                                    Add Category
                                </motion.button>
                                <motion.button type="submit" className='buttons' disabled={submitting}
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