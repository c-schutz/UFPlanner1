import { useState, useEffect } from 'react';
import './bcontainer.css';

export function BudgetContainer({ svgData }) {
    // initial budget state is inactive
    const [isActive, setIsActive] = useState(false); 
    const [data, setData] = useState('');
    useEffect(()=>{
        if(svgData != null){
            setIsActive(true);
            // get just the svg we want temp fix
            setData(svgData.pie);
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
            <p>
                test
            </p>
            {/* set the svgData to display when rendered */}
            {isActive && (
              <div dangerouslySetInnerHTML={{ __html: data }} />
            )} 
            <button onClick={handleData} className='updateButton'>
                Data Input
            </button>
        </div>
        </>
    );
}

//all the gathering of the svg data is temporary right now, in reality I think we should just keep the budget data in local storage and read it directly in this file whenever they
//access this page if they aren't logged in. if they are logged in then I think we should make a request to the backend for all of the budget data for their userID and then just display
//it on page load. This is mostly just so that I can test the svg display.
