import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bankingcats from './bankingcats';
import { motion, useAnimate } from "motion/react";
import './bankingstyles.css';

function Banking() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState(() => {
        if (sessionStorage.getItem("currentbdata") == null) {
            return bankingcats;
        } else {
            return JSON.parse(sessionStorage.getItem("currentbdata"));
        }
    });

    const handleInputChange = (id, newValue) => {
        const newCategories = categories.map(category =>
            category.id === id ? { ...category, value: newValue } : category
        );
        setCategories(newCategories);
    };

    // const addCategory = () => {
    //     const categoryName = prompt("Enter the new category name:");
    //     if (categoryName) {
    //         const newCategory = {
    //             id: categories.length + 1,
    //             name: categoryName.trim(),
    //             value: ''
    //         };
    //         setCategories([...categories, newCategory]);
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log('Banking Data:', categories);
        sessionStorage.setItem('currentbdata', JSON.stringify(categories));
        navigate('/Budget/Allocation');
    };

    const backClick = () => {
        navigate('/Budget/Questionnaire');
    }

    const checkInputs = (event) => {
        var sum = 0;
        categories.forEach((value, index) => {
            sum += Number(value.value);
        });
        if (sum == 0) {
            alert("No banking data entered.");
        } else {

            handleSubmit(event);
        }
    }

    return (
        <>
            <p>
                Input Banking Information
            </p>
            <p>
                Note: if you get paid biweekly take your estimate for each week
            </p>
            <hr className="ahr"></hr>
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
                    <div className='c'>
                        <div className="buttonContainer">
                            <motion.button type="button" onClick={backClick} className='buttons'
                                whileHover={{ scale: 1.1 }}>
                                Back
                            </motion.button>
                            {/* <motion.button type="button" onClick={addCategory} className='buttons'
                                whileHover={{ scale: 1.1 }}>
                                Add Category
                            </motion.button> */}
                            <motion.button type="submit" className='buttons'
                                whileHover={{ scale: 1.1 }}>
                                Submit Data
                            </motion.button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Banking;