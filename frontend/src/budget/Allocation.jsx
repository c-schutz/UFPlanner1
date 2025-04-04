import React, { useState, useContext, useEffect } from 'react';
import cats from './alloccats';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from "motion/react";
import { useVData } from '../Vcontext';
import './bankingstyles.css';

function Allocation() {
    const [submitting, setSubmitting] = useState(false);
    const { vData, setV } = useVData();//get from context
    const { logged, setLogged } = useVData();
    const [weightData, setWeightData] = useState({
        needs: 50,
        wants: 30,
        savings: 20
    });;

    //for testing
    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const [suggest, setSuggest] = useState(false);
    const [suggestion, setSuggestion] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState(null); // State to store response data

    const [categories, setCategories] = useState(() => {
        const storedCats = sessionStorage.getItem('localAlloCats');
        return storedCats ? JSON.parse(storedCats) : cats;
    });

    //create suggestion and default input data
    //create suggestion and default input data
    useEffect(() => {
        const answerData = JSON.parse(sessionStorage.getItem('currentqdata'));

        //first determine what the suggestion box will say
        const budgetBalancing = {
            "needs": 0,
            "wants": 0,
            "savings": 0
        }

        const ansToValue = {
            "very much so": 2,
            "a little bit": 1,
            "not sure": 0,
            "not really": -1,
            "no": -2
        }

        let bType = null;
        let i = 0;
        const keys = Object.keys(answerData);
        const qLength = keys.length;
        let val = 0;

        //change budgetBalancing to match questionnaire
        for (i = 1; i < qLength + 1; i++) {
            if (answerData[i].type == 'needs') {
                val = ansToValue[answerData[i].response];
                budgetBalancing["needs"] += val;
            } else if (answerData[i].type == 'wants') {
                val = ansToValue[answerData[i].response];
                budgetBalancing["wants"] += val;
            } else if (answerData[i].type == 'savings') {
                val = ansToValue[answerData[i].response];
                budgetBalancing["savings"] += val;
            } else {
                console.log("incorrect type name");
            }
        }

        //update suggestion based on budgetBalancing
        if (budgetBalancing["needs"] >= 0 & budgetBalancing["wants"] >= 0 & budgetBalancing["savings"] >= 0) {//e n0
            bType = "Your questionnaire answers support a balanced budget. We have allocated amounts to each category based upon this data.";
        } else if (budgetBalancing["needs"] <= 0 & budgetBalancing["wants"] <= 0 & budgetBalancing["savings"] <= 0) {//e0 n0 as well for all negative
            bType = "Your questionnaire answers support a balanced budget. We have allocated amounts to each category based upon this data.";
        }else if (budgetBalancing["needs"] <= 0 & budgetBalancing["wants"] >= 0 & budgetBalancing["savings"] >= 0) {//e0
            bType = "Your questionnaire answers support a budget focused on wants and savings. We have allocated amounts to each category based upon this data.";
        } else if (budgetBalancing["needs"] >= 0 & budgetBalancing["wants"] <= 0 & budgetBalancing["savings"] >= 0) {//w
            bType = "Your questionnaire supports a budget focused on needs and savings. We have allocated amounts to each category based upon this data.";
        } else if (budgetBalancing["needs"] <= 0 & budgetBalancing["wants"] <= 0 & budgetBalancing["savings"] >= 0) {//w0
            bType = "Your questionnaire supports a budget focused on savings. We have allocated amounts to each category based upon this data.";
        } else if (budgetBalancing["needs"] >= 0 & budgetBalancing["wants"] <= 0 & budgetBalancing["savings"] <= 0) {//n
            bType = "Your questionnaire supports a budget focused on needs. We have allocated amounts to each category based upon this data.";
        } else if (budgetBalancing["needs"] >= 0 & budgetBalancing["wants"] >= 0 & budgetBalancing["savings"] <= 0) {//s
            bType = "Your questionnaire supports a budget focused on wants and needs. We have allocated amounts to each category based upon this data.";
        } else if (budgetBalancing["needs"] <= 0 & budgetBalancing["wants"] >= 0 & budgetBalancing["savings"] <= 0) {//s0
            bType = "Your questionnaire supports a budget focused on wants. We have allocated amounts to each category based upon this data.";
        } else {
            console.log("caleb did smth wrong :(");
        }
        bType ? setSuggestion(bType) : null;
        setSuggest(true);

        //now change category default values
        let weights = {
            "needs": 50,
            "wants": 30,
            "savings": 20
        };

        const multiplier = { //used to multiply the question weight based on the answer
            "very much so": 1,
            "a little bit": .5,
            "not sure": 0,
            "not really": -.5,
            "no": -1
        }

        function roundToTwo(num) {
            return Number(num.toFixed(2));
        }

        for (i = 1; i < qLength + 1; i++) {
            if (answerData[i].type == "needs") {
                let plus = roundToTwo(answerData[i].weight * multiplier[answerData[i].response]);
                let minus = roundToTwo(-(plus / 2));
                weights["needs"] += plus;
                weights["wants"] += minus;
                weights["savings"] += minus;
            } else if (answerData[i].type == 'wants') {
                let plus = roundToTwo(answerData[i].weight * multiplier[answerData[i].response]);
                let minus = roundToTwo(-(plus / 2));
                weights["needs"] += minus;
                weights["wants"] += plus;
                weights["savings"] += minus;
            } else if (answerData[i].type == 'savings') {
                let plus = roundToTwo(answerData[i].weight * multiplier[answerData[i].response]);
                let minus = roundToTwo(-(plus / 2));
                weights["needs"] += minus;
                weights["wants"] += minus;
                weights["savings"] += plus;
            } else {
                console.log("incorrect weighting name");
            }
        }

        // Handle negative weights
        function balanceNegativeWeights(weights) {
            let adjustedWeights = { ...weights };

            // Check if any weights are negative
            const categories = ["needs", "wants", "savings"];
            const negativeCategories = categories.filter(cat => adjustedWeights[cat] < 0);

            if (negativeCategories.length > 0) {
                negativeCategories.forEach(negCat => {
                    const negValue = adjustedWeights[negCat];
                    const otherCategories = categories.filter(cat => cat !== negCat);

                    // Calculate how much to add to the other categories
                    const addPerCategory = roundToTwo(-negValue / otherCategories.length);

                    // Add half the negative value to each of the other categories
                    otherCategories.forEach(cat => {
                        adjustedWeights[cat] += addPerCategory;
                    });

                    // Set the negative category to 0
                    adjustedWeights[negCat] = 0;
                });
            }

            // Make sure the sum is exactly 100
            let totalWeight = categories.reduce((sum, cat) => sum + adjustedWeights[cat], 0);

            if (Math.abs(totalWeight - 100) > 0.01) {
                const scaleFactor = 100 / totalWeight;
                categories.forEach(cat => {
                    adjustedWeights[cat] = roundToTwo(adjustedWeights[cat] * scaleFactor);
                });
            }

            return adjustedWeights;
        }

        // Apply the balancing mechanism
        const balancedWeights = balanceNegativeWeights(weights);

        // Update the weightData state with the balanced weights
        setWeightData(balancedWeights);

        // Also update the categories with these balanced weights
        const updatedCategories = categories.map(category => {
            if (category.name.toLowerCase() === "needs") {
                return { ...category, value: balancedWeights.needs };
            } else if (category.name.toLowerCase() === "wants") {
                return { ...category, value: balancedWeights.wants };
            } else if (category.name.toLowerCase() === "savings") {
                return { ...category, value: balancedWeights.savings };
            }
            return category;
        });

        setCategories(updatedCategories);

        // console.log("Original weights:", weights);
        // console.log("Balanced weights:", balancedWeights);

    }, []);

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
                value: 0
            };
            setCategories([...categories, newCategory]);  // Ensures real-time update in UI
            sessionStorage.setItem('localAlloCats', JSON.stringify([...categories, newCategory]));
        }
    };

    const handleSubmit = () => {
        sessionStorage.removeItem('currentqdata');
        sessionStorage.removeItem('currentbdata');//only delete the form data that we want to be defaulted
        sessionStorage.removeItem('currentadata');
        sessionStorage.removeItem('localAlloCats');
        setCategories(cats);
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

                let qData = JSON.parse(sessionStorage.getItem('currentqdata'));
                let bData = JSON.parse(sessionStorage.getItem('currentbdata'));
                let aData = JSON.parse(sessionStorage.getItem('currentadata'));

                let fullData = {
                    userID: sessionStorage.getItem('userID'),
                    questionnaire: qData,
                    banking: bData,
                    allocation: aData
                };


                setLoading(true);
                try {
                    const data = {
                        data: fullData,
                        isLoggedIn: true,
                        screenheight: window.innerHeight
                    };
                    const dataToSend = JSON.stringify(data);
                    console.log(dataToSend);

                    const responseData = await fetchData(dataToSend);
                    console.log(responseData);

                    await timeout(2000);//example delay from server

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
                        isLoggedIn: false,
                        screenheight: window.innerHeight
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

                    handleSubmit();
                } catch (error) {
                    console.error('Data loading failed:', error);
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    const handleBack = () => {
        setCategories(cats); // Reset categories to default
        sessionStorage.removeItem('localAlloCats'); // Assuming you want to clear any session-stored categories
        navigate('/Budget/Banking'); // Navigate to the desired route
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
                                <motion.button type="button" onClick={handleBack} className='buttons' disabled={submitting}
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
                <div className={suggest ? 'suggest' : 'remove'}><p>{suggestion}</p></div>
            </div>
            <div className='loading'>
                {loading && (<object className='loadingCircles' type="image/svg+xml" data="/circleloadingsm.svg">Your browser does not support SVG</object>)}
            </div>
        </>
    );
}

export default Allocation;