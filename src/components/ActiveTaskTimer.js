import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { UpdateTaskStatus, SetActiveTask, selectItem } from '../actions';

const mapStateToProps = state => {
    return {
        activeTask: state.SetActiveTaskReducer.activeTask,
        status: state.UpdateTaskStatusReducer.taskStatus,
        activeSince: state.SetActiveTaskReducer.activeSince,
        timeNow: state.SetActiveTaskReducer.timeNow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskStatus: (status) => {
            return dispatch(UpdateTaskStatus(status))
        },
        setActiveTask: (task) => {
            return dispatch(SetActiveTask(task))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTaskTimer);

function ActiveTaskTimer({changeItemID, activeSince, activeTask}) {
    const dateNow = (new Date()).getTime();
    const timeSpent = activeTask.timeSpent + (dateNow - activeSince);

    let s = timeSpent;
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

    const [seconds, setSeconds] = useState(secs);
    const [minutes, setminutes] = useState(mins);
    const [hours, sethours] = useState(hrs);
    const [isActive, setIsActive] = useState(false);

    if( (parseInt(activeTask.id) !== undefined) && isActive === false){
        setIsActive(true);
    }

    useEffect(() => {
        let interval = null;
        if ( isActive ) {
        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            if(seconds >= 59){
                setminutes(minutes => minutes +1);
                setSeconds(0);
                if(minutes >= 59){
                    sethours(hours => hours +1);
                    setminutes(0);
                }
            }
        }, 1000);
        } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [ isActive, seconds, minutes, hours ]);

    function goToTask(event){
        event.stopPropagation();
        changeItemID(activeTask.id)
    }

    switch(activeTask.id){
        case undefined:
            return (
                <div></div>
            )
        default:
            return (
                <div className="" onClick={goToTask} >
                    <div className=" pt3 ">
                        <h2 className="pa1 ">CURRENT TASK</h2>
                        <h2 className="pa1 red ">{activeTask.name}</h2>
                        <h2 className='pa1 fw3 b red'>{hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                        {minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                        {seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})} </h2>
                    </div>
                </div>
            );
    }
}