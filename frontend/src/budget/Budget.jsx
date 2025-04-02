import React, { useState, useEffect } from 'react';
import { motion, useAnimate } from "motion/react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useVData } from '../Vcontext';
import { BudgetContainer } from '../components/BudgetContainer';
import './bstyles.css';

function Budget() {
    //hook declaration
    const { logged, setLogged } = useVData();
    const [scope, animate] = useAnimate()
    const [delay, setDelay] = useState(false);
    const [svgData, setSVGData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (logged) {
            async function fetchData() {
                try {
                    const userData = JSON.stringify({
                        userID: sessionStorage.getItem('userID'),
                        screenheight: window.innerHeight
                    });

                    const response = await fetch("http://localhost:3001/api/budget-data", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: userData
                    });

                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }

                    const rData = await response.json();
                    setSVGData(rData.visualizedData);
                    console.log("The visualized svg data from the db is ", rData.visualizedData);
                } catch (error) {
                    console.error(error.message);
                }
            }
            fetchData();
        } else {
            const s = sessionStorage.getItem('svgData');
            if (s) {
                try {
                    const parsed = JSON.parse(s);
                    if (Array.isArray(parsed)) {
                        setSVGData(parsed);
                    } else {
                        console.error("Data in sessionStorage is not an array:", parsed);
                        setSVGData([]); // Fallback to empty array
                    }
                } catch (error) {
                    console.error("Error parsing svgData from sessionStorage:", error);
                    setSVGData([]); // Fallback to empty array on parse error
                }
            } else {
                console.log("No svgData in sessionStorage");
                setSVGData([]);
            }
        }
    }, [logged]);

    async function myAnimation() {
        await animate("button", { y: -5 }, { duration: .2 });
        await animate("button", { y: 5 }, { duration: .2 });
    }

    const handleClick = () => {
        if (!delay) {
            setDelay(true); //debounce
            myAnimation();
            myAnimation().then(() => {
                navigate('/Budget/Questionnaire');
            });
            const tout = setTimeout(() => { //setTimeout only runs once vs setInterval which runs multiple times
                setDelay(false);
            }, 1000);
            return () => clearTimeout(tout);
        }
    }


    return (
        <>
            <Navbar />
            <p className="btitle">Here you can create your own budgets!</p>
            <hr className="bhr" />
            <div ref={scope}>
                <motion.button className='new-budget-button' onClick={handleClick}
                    whileHover={{ scale: 1.1 }}>
                    <span>+</span>
                    New Budget
                </motion.button>
            </div>
            {/* pass in the svgData to render in each budget */}
            {Array.isArray(svgData) && svgData.map((svg, index) => (
                !logged && svg ? <BudgetContainer key={index} svgData={svg} bIndex={index} canDelete={false}/> : null
            ))}
            {Array.isArray(svgData) && svgData.map((svg, index) => (
                logged && svg ? <BudgetContainer key={index} bIndex={index} svgData={svg} canDelete={true}/> : null
            ))}
        </>
    );
}

export default Budget;