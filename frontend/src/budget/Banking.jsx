import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Banking() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([
        { id: 1, name: 'Savings', value: '' },
        { id: 2, name: 'Investments', value: '' },
        { id: 3, name: 'Expenses', value: '' }
    ]);

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
        navigate('/Budget/Allocation');
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

export default Banking;