import React, { useState } from 'react';
import cats from './alloccats';
import { useNavigate } from 'react-router-dom';

function Allocation(){
    const navigate = useNavigate();
    const allocationCategories = cats;
    console.log(allocationCategories);
    
    const [categories, setCategories] = useState(allocationCategories);

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
            setCategories([...categories, newCategory]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Banking Data:', categories);
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