import { useState, useEffect, useRef } from 'react';
import './bcontainer.css';
import { useVData } from '../Vcontext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';

export function BudgetContainer({ svgData, bIndex, canDelete, userID, bData }) {
    const { logged, setLogged } = useVData();
    const [events, setEvents] = useState([]);

    function roundToTwo(num) {
        return Number(num.toFixed(2));
    }

    // example event entry
    // [
    //     {
    //         title: 'Test Event!',
    //         rrule: {
    //             freq: 'weekly',
    //             interval: 1,
    //             byweekday: [1],
    //             dtstart: '2023-01-02T10:00:00'
    //         },
    //         extendedProps: {
    //             description: "Maybe this will be for savings, maybe not!"
    //         }
    //     }
    // ]

    const handleEvents = () => {
        if (bData == null) {
            return;
        }

        bData["allocation"].forEach(element => {
            if (element.name == "Needs") {//create needs event here
                const currentEvent =
                {
                    title: 'Needs',
                    rrule: {
                        freq: 'weekly',
                        interval: 1,
                        byweekday: [5], //set aside for needs on saturday
                        dtstart: '2023-01-02T10:00:00'
                    },
                    extendedProps: {
                        description: "Set aside $" + roundToTwo((element.value / 100) * bData["banking"][0].value) + " for your needs."
                    },
                    classNames: ["needs-event"]
                }
                setEvents(prevEvents => [...prevEvents, currentEvent]);

            } else if (element.name == "Wants") {
                const currentEvent =
                {
                    title: 'Wants',
                    rrule: {
                        freq: 'daily',
                        interval: 1,
                        dtstart: '2023-01-02T10:00:00'
                    },
                    extendedProps: {
                        description: "You can spend $" + roundToTwo(((element.value / 100) * bData["banking"][0].value) / 7) + " on yourself today!"
                    },
                    classNames: ["wants-event"]
                }

                setEvents(prevEvents => [...prevEvents, currentEvent]);

            } else if (element.name == "Savings") {
                const currentEvent =
                {
                    title: 'Save',
                    rrule: {
                        freq: 'weekly',
                        interval: 1,
                        byweekday: [6], //save on sunday
                        dtstart: '2023-01-02T10:00:00'
                    },
                    extendedProps: {
                        description: "Put $" + roundToTwo((element.value / 100) * bData["banking"][0].value) + " in some savings/investments today."
                    },
                    classNames: ["savings-event"]
                }
                setEvents(prevEvents => [...prevEvents, currentEvent]);

            } else {//extra allocation event
                const currentEvent =
                {
                    title: element.name,
                    rrule: {
                        freq: 'weekly',
                        interval: 1,
                        byweekday: [3], //set aside for needs on saturday
                        dtstart: '2023-01-02T10:00:00'
                    },
                    extendedProps: {
                        description: "Set aside $" + roundToTwo((element.value / 100) * bData["banking"][0].value) + " to save for " + element.name + "."
                    },
                    classNames: ["extra-event"]
                }
                setEvents(prevEvents => [...prevEvents, currentEvent]);
            }
        });
    }

    useEffect(() => {
        console.log(bData);
        setEvents([]);
        handleEvents();
    }, []);  // This will re-run the effect whenever bData changes

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

    const [tooltip, setTooltip] = useState({ visible: false, content: "" });
    const entryTimeout = useRef(null);

    const whenMouseEnters = (enterInfo) => {
        if (entryTimeout.current) {//if timer has been set
            clearTimeout(entryTimeout.current);
        } else {//timer hasn't been set at all yet
            setTooltip({
                visible: true,
                content: enterInfo.event.extendedProps.description
            });
        }
        entryTimeout.current = setTimeout(() => {
            entryTimeout.current = null;//sets it to null after the debounce ends so that the else statement can run
        }, 100); // Debounce for 500 milliseconds
    };

    const whenMouseLeaves = () => {
        if (entryTimeout.current) {
            clearTimeout(entryTimeout.current);
        }
        setTooltip({ visible: false, content: "" });
    };

    return (
        <>
            <div className='bHolder'>
                {logged && <p className='bTitle'>
                    {bData.bname}
                </p>}
                {
                    canDelete ? (<button onClick={deleteBudget} className='delete'>
                        Delete
                    </button>) : null
                }
                <div className={logged ? 'calenderContainerl' : 'calenderContainer'}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
                        initialView="dayGridWeek"
                        headerToolbar={{
                            start: 'prev,next',
                            center: '',
                            end: 'today'
                        }}
                        height="50vh"
                        events={events}
                        eventContent={(eventInfo) => {
                            // You can return a custom JSX element
                            return (
                                <>
                                    <b>{eventInfo.event.title}</b> {/* Only display the title */}
                                </>
                            );
                        }}
                        eventMouseEnter={whenMouseEnters}
                        eventMouseLeave={whenMouseLeaves}
                    />

                    {tooltip.visible && (
                        <div className="tooltip" style={{ position: 'relative', left: "20%", zIndex: 1000 }}>
                            {tooltip.content}
                        </div>
                    )}
                </div>
                <div className='contentWrapper'>
                    {isActive && (
                        <div className='svgContainer' dangerouslySetInnerHTML={{ __html: data }} />
                    )}
                    {/* <div className='buttonContainer'> move somewhere else
                        <button onClick={handleData} className='updateButton'>
                            Data Input
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
}