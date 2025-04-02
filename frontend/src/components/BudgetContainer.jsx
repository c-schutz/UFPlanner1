import { useState, useEffect } from 'react';
import './bcontainer.css';
import { useVData } from '../Vcontext';

export function BudgetContainer({ svgData, bIndex, canDelete, userID }) {
    const { logged, setLogged } = useVData();

    async function fetchData() {
        const userIDFS = sessionStorage.getItem('userID');
        try {
            const userData = JSON.stringify({
                userID: userIDFS,
                bIndex: bIndex
            });

            const response = await fetch("http://localhost:3001/api/delete", {
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
    // initial budget state is inactive
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        console.log(canDelete);
    }, []);
    useEffect(() => {
        if (svgData != null) {
            setIsActive(true);
            setData(svgData);
        } else {
            setIsActive(false);
        }
    }, [svgData]);

    const handleData = () => {
        console.log("handle the updated data here");
    }

    const deleteBudget = () => {
        fetchData();
        //refresh Budget Page
        window.location.reload();
    }

    return (
        <>
            <div className='bHolder'>
                <p className='bTitle'>
                    default title
                </p>
                {
                    canDelete ? (<button onClick={deleteBudget} className='delete'>
                        Delete
                    </button>) : null
                }
                <div className='contentWrapper'>
                    {isActive && (
                        <div className='svgContainer' dangerouslySetInnerHTML={{ __html: data }} />
                    )}
                    <div className='buttonContainer'>
                        <button onClick={handleData} className='updateButton'>
                            Data Input
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}