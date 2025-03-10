import React, { useState } from 'react';
import cats from './alloccats';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from "motion/react";
import './bankingstyles.css';

function Allocation() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
        console.log('Form Submission:', categories);
        localStorage.clear();  // Consider changing when deploying actual app logic instead of clearing everything
        navigate('/Budget');
    };

    const fetchData = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("Data Loaded");
            }, 5000);
        });
    };

    const checkInputs = async (event) => {
        event.preventDefault();
        var sum = categories.reduce((sum, category) => sum + Number(category.value), 0);
        if (sum !== 100) {
            alert("Your selection doesn't add up to 100!");
        } else {
            setLoading(true);
            try {
                const data = await fetchData();
                console.log('Pseudo data loaded:', data);
                handleSubmit();
            } catch (error) {
                console.error('Data loading failed:', error);
                alert("Failed to load data.");
            }
            setLoading(false);
        }
    };

    return (
        <>
            <p>Enter (percentage) allocation amounts.</p>
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
            <div className='loading'>
                {loading && (<object className='loadingCircles' type="image/svg+xml" data="/circleloadingsm.svg">Your browser does not support SVG</object>)}
            </div>
        </>
    );
}

export default Allocation;