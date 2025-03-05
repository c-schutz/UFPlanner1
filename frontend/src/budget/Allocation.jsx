import React, { useState } from 'react';
import cats from './alloccats';
import { useNavigate } from 'react-router-dom';

function Allocation(){
    const navigate = useNavigate();
    const allocationCategories = cats;
    //console.log(allocationCategories);
    
    const [categories, setCategories] = useState(() =>{
        if(localStorage.getItem('localAlloCats') == null){
            return cats;
        }else{
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

    const backClick = () =>{
        navigate(-1);
      }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {categories.map((category) => (
                    <div key={category.id}>
                        <label>
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
                <button type="button" onClick={addCategory}>Add Category</button>
                <button type="submit">Submit Data</button>
            </form>
            <div className="navigation-buttons">
                <button type="button" onClick={backClick}>Back</button>
            </div>
        </>
    );
}

export default Allocation;