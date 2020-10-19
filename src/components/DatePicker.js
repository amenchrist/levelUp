import React, { useState, useEffect } from 'react';

export default function DatePicker({ item, dueDate }){
    const [ date, setdate ] = useState((new Date(dueDate)).toISOString().substr(0, 10));
    const [ changeDate, setchangeDate ] = useState(false);
    const changeD = false;


    useEffect(() => {
        setdate((new Date(dueDate)).toISOString().substr(0, 10));
        setchangeDate(false);
    }, [dueDate, changeD])

    switch(changeDate){
        case true:
            return (
                <div>
                    <input type='date' defaultValue={date} onChange={(e)=> {setdate(e.target.value);} } onBlur={() =>{item.dueDate=date; setchangeDate(false)}} className='fw3 white bn bg-transparent' />
                </div>
                )
        default:
            return (
            <h5 className='fw3 white' onClick={() => setchangeDate(true)}>Due: {new Date(item.dueDate).toISOString().substr(0, 10)} </h5>
            )
    }
}