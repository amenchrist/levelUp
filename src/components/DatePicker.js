import React, { useState, useEffect } from 'react';
import { ASAP } from '../constants';
import { convertDateToMilliseconds } from '../functions';

export default function DatePicker({ item, dueDate }){

    // REASSIGN DUE DATE TO FIX "ASAP" DATE FORMAT ISSUES
    let dateValue;
    dueDate === ASAP ?dateValue = new Date().getTime() : dateValue = dueDate;

    // CONVERT DATE STRING TO MILLISECONDS
    
      
    const [ date, setdate ] = useState((new Date(dateValue)).toISOString().substr(0, 10));
    const [ changeDate, setchangeDate ] = useState(false);
    const [ isASAP, setIsASAP ] = useState(false);
    
    //   let str = "2020-10-26";
    //   console.log(prepareDate(str));

    useEffect(() => {
        // setdate((new Date(dateValue)).toISOString().substr(0, 10));
        // setchangeDate(false);
        if (dueDate === ASAP){
            setIsASAP(true)
        }
    }, [dueDate, ASAP])

    switch(changeDate){
        case true:
            return (
                <div>
                    <input type='date' className='fw3 white bn bg-transparent' autoFocus
                    defaultValue={date}
                    onChange={(e)=> {setdate(e.target.value);} } 
                    onBlur={() =>{}} 
                    />
                    <div>
                        <button className="button" onClick={() => { item.dueDate = ASAP; setIsASAP(true); setchangeDate(false) }}>A.S.A.P</button>
                        <button className="button" onClick={() => { item.dueDate=convertDateToMilliseconds(date); setchangeDate(false); setIsASAP(false) }}>Save</button>
                    </div>
                </div>
            )
        default:
            if (isASAP){
                return (
                    <div>
                        <h5 className='fw4 white' onClick={() => setchangeDate(true)}>Due: ASAP</h5>
                    </div>
                    )
            }
            return (
                <h5 className='fw4 white' onClick={() => setchangeDate(true)}>Due: {(new Date(dateValue)).toISOString().substr(0, 10)} </h5>
            )
    }
}