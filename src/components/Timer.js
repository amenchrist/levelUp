import React, { useState, useEffect } from 'react';
import './Timer.css';
import { connect } from 'react-redux';
import { UpdateTaskStatus, SetActiveTask } from '../actions';

const mapStateToProps = state => {
    return {
        activeTask: state.SetActiveTaskReducer.activeTask,
        status: state.UpdateTaskStatusReducer.taskStatus,
        activeSince: state.SetActiveTaskReducer.activeSince
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskStatus: (status) => {
            return dispatch(UpdateTaskStatus(status))
        },
        setActiveTask: (id) => {
            return dispatch(SetActiveTask(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

function Timer({ timeSpent, task, timerOn, activeTask, activeSince }){


    if (task.id === parseInt(activeTask) ){
        const dateNow = (new Date()).getTime();
        // console.log('time spent =' + task.timeSpent)
        // console.log('active since ' + activeSince)
        // console.log('date now = '+dateNow)
        // console.log('this is actve task' + task.id)
        timeSpent = timeSpent + (dateNow - activeSince);
        //task.timeSpent= timeSpent;
        //console.log('time spent after calculation =' + task.timeSpent)
    }

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

    // let totalTimeSpent = (seconds*1000)+(minutes*60*1000)+(hours*3600*1000); //Time spent in milliseconds


    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setminutes(0);
        sethours(0);
        setIsActive(false);
    }

    useEffect(()=>{
        setSeconds(secs);
        setminutes(mins);
        sethours(hrs);
        
        
    },[ secs, mins, hrs, task.timeSpent ])

    //useEffect(msToTime);
    // console.log(task.id);
    // console.log(activeTask);
    // console.log(activeTask === task.id)

    if( (task.id === parseInt(activeTask)) && isActive === false){
        setIsActive(true);
    }
    

    useEffect(() => {
        let interval = null;
        if ( isActive && (task.id === parseInt(activeTask)) ) {
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
            let totalTimeSpent = (seconds*1000)+(minutes*60*1000)+(hours*3600*1000);
            task.timeSpent = totalTimeSpent;
            console.log((new Date()).getTime());
        }, 1000);
        } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
        
    }, [isActive, seconds, minutes, hours, activeTask, task.id, task.timeSpent ]);


    switch(task.id){
        case activeTask:
            return (
                <div className="">
                <div className="">
                    <h5 className='fw3 white b'>Time Spent: {hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})} </h5>
                </div>
                </div>
            );
        default:
            return (
                <div className="">
                <div className="">
                    <h5 className='fw3 white b'>Time Spent: {hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})} </h5>
                </div>
                <div className="">
                    <button className='' onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
                    <button className='' onClick={reset}>Reset</button>
                </div>
                </div>
            );
    }

};
