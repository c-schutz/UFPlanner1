import { useState, useEffect } from 'react';
import './bcontainer.css';

export function BudgetContainer({ svgData }) {
    // initial budget state is inactive
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState('');
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

    return (
        <>
            <div className='bHolder'>
                <p className='bTitle'>
                    default title
                </p>
                <div className='contentWrapper'>
                    {isActive && (
                        <div className='svgContainer' dangerouslySetInnerHTML={{ __html: data }}/>
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