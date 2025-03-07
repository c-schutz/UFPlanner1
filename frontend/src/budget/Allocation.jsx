import React, { useState } from 'react';
import cats from './alloccats';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from "motion/react";
import './bankingstyles.css';

function Allocation() {
    const navigate = useNavigate();
    const allocationCategories = cats;
    //console.log(allocationCategories);

    const [categories, setCategories] = useState(() => {
        if (localStorage.getItem('localAlloCats') == null) {
            return cats;
        } else {
            return JSON.parse(localStorage.getItem('localAlloCats'));
        }
    });

    function saveToLocalStorage(key, data) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                resolve();
            } catch (error) {
                localStorage.removeItem(key);
                reject(error);
            }
        });
    }

    async function handleInputChange(id, newValue) {

        // First, compute the new categories array
        const newCategories = categories.map(category =>
            category.id === id ? { ...category, value: newValue } : category
        );

        // Update state
        setCategories(newCategories);

        // Define a function that returns a promise to handle localStorage asynchronously
        const saveToLocalStorage = (key, data) => new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                resolve();
            } catch (error) {
                console.error("Failed to save data to localStorage:", error);
                localStorage.removeItem(key);
                reject(error);
            }
        });

        // Use the updated categories for saving to local storage
        await saveToLocalStorage('localAlloCats', newCategories);
    }

    const addCategory = () => {
        const categoryName = prompt("Enter the new category name:");
        if (categoryName) {
            const newCategory = {
                id: categories.length + 1,
                name: categoryName.trim(),
                value: ''
            };
            setCategories([...categories, newCategory]);
            localStorage.setItem('localAlloCats', JSON.stringify(categories));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(categories);
        localStorage.clear(); //clears after form is submitted, to change later
        navigate('/Budget');
    };

    const backClick = () => {
        navigate(-1);
    }

    return (
        <>
            <p>
                Enter (percentage) allocation amounts.
            </p>
            <hr className="ahr"></hr>
            <div className='formControl'>
                <form onSubmit={handleSubmit} className='form'>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <label classname='lStyle2'>
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
        </>
    );
}

export default Allocation;