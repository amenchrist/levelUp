import React, { useState, useEffect } from 'react';
import { ASAP, MISSIONS } from '../constants';
import { convertDateToMilliseconds, pushChanges } from '../functions';
import {UpdateExp, ShipItems,ChangeNav } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        itemID: state.values.itemID,
        previousView: state.values.previousView,
        exp: state.UpdateExpReducer.exp,
        status: state.UpdateTaskStatusReducer.taskStatus,
        activeTask: state.SetActiveTaskReducer.activeTask,
        activeSince: state.SetActiveTaskReducer.activeSince,
        db: state.items.record.items 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);

function DatePicker({ item, dueDate, db, title, updateFunc }){

    let DbList = ''
    switch (title) {
        case MISSIONS:

    }

    // REASSIGN DUE DATE TO FIX "ASAP" DATE FORMAT ISSUES
    let dateValue;
    dueDate === ASAP ? dateValue = new Date().getTime() : dateValue = dueDate;

    // CONVERT DATE STRING TO MILLISECONDS
    const [ date, setDate ] = useState((new Date(dateValue)).toISOString().substr(0, 10));
    const [ changeDate, setChangeDate ] = useState(false);
    const [ isASAP, setIsASAP ] = useState(false);
    
    //   let str = "2020-10-26";
    //   console.log(prepareDate(str));

    useEffect(() => {
        setChangeDate(false);
        setDate((new Date(dateValue)).toISOString().substr(0, 10));
        // setChangeDate(false);
        if (dueDate === ASAP){
            setIsASAP(true)
        } else {
            setIsASAP(false)
        }
    }, [dueDate, ASAP])

    switch(changeDate){
        case true:
            return (
                <div>
                    <input type='date' className='fw3 white bn bg-transparent' autoFocus
                    defaultValue={date}
                    onChange={(e)=> {setDate(e.target.value);} } 
                    onBlur={() =>{}} 
                    />
                    <div>
                        <button className="button" onClick={() => { 
                            updateFunc(ASAP); setIsASAP(true); 
                            setChangeDate(false) 
                        }}>A.S.A.P</button>
                        <button className="button" onClick={() => { 
                            updateFunc(convertDateToMilliseconds(date)); 
                            setChangeDate(false); setIsASAP(false) 
                        }}>Save</button>
                    </div>
                </div>
            )
        default:
            if (isASAP){
                return (
                    <div>
                        <h5 className='fw4 white' onClick={() => setChangeDate(true)}>Due: ASAP</h5>
                    </div>
                    )
            }
            return (
                <h5 className='fw4 white' onClick={() => setChangeDate(true)}>Due: {date} </h5>
            )
    }
}