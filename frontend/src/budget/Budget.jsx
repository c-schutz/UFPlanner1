import React, { useState, useEffect } from 'react';
import { motion, useAnimate } from "motion/react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useVData } from '../Vcontext';
import { BudgetContainer } from '../components/BudgetContainer';
import './bstyles.css';

function Budget() {
    //hook declaration
    const { vData, setV } = useVData();//get from context
    const [scope, animate] = useAnimate()
    const [delay, setDelay] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        console.log("vData changed");
        console.log(vData);
    },[vData]);
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
            {/* pass in the vData to render in each budget */}
            <BudgetContainer svgData={vData}/>
        </>
    );
}

export default Budget;