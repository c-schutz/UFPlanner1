import { useState, useEffect } from 'react';
import './bcontainer.css';

export function BudgetContainer({ svgData }) {
    // initial budget state is inactive
    const [isActive, setIsActive] = useState(false); 
    const [data, setData] = useState('');
    useEffect(()=>{
        if(svgData != null){
            setIsActive(true);
            setData(svgData);
        }else{
            setIsActive(false);
        }
    }, [svgData]);

    const handleData = () =>{
        console.log("handle the updated data here");
    }

    return (
        <>
        <div className='bHolder'>
            <p className='bTitle'>
                default title
            </p>
            {/* set the svgData to display when rendered */}
            {isActive && (
              <div dangerouslySetInnerHTML={{ __html: data }}/>
            )} 
            <button onClick={handleData} className='updateButton'>
                Data Input
            </button>
        </div>
        </>
    );
}
