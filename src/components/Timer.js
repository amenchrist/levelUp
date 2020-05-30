import React, { useState, useEffect } from 'react';
import './Timer.css';
import { connect } from 'react-redux';
import { UpdateTaskStatus, SetActiveTask } from '../actions';

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

function Timer({ timeSpent, task, timerOn, activeTask, activeSince, timeNow }){

    //console.log('render 1st')
    //console.log(timeNow)


    if (task.id === parseInt(activeTask.id) ){
        const dateNow = (new Date()).getTime();
        // console.log('time spent =' + task.timeSpent)
        // console.log('active since ' + activeSince)
        // console.log('date now = '+dateNow)
        // console.log('this is actve task' + task.id)
        //console.log(1)
        timeSpent = timeSpent + (dateNow - activeSince);
        //task.timeSpent= timeSpent;
        //console.log('time spent after calculation =' + task.timeSpent)
    }

    //console.log('render 2nd position')

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
    const [isUpdated, setIsUpdated] = useState(false);
    

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
        console.log('useeffect 1')
        setSeconds(secs);
        setminutes(mins);
        sethours(hrs);
        if (task.id !== parseInt(activeTask.id) ){
            setIsUpdated(false);
            setIsActive(false)
        }
        // if (task.id !== parseInt(activeTask.id) ){
        //     const dateNow = (new Date()).getTime();
        //      console.log('active time spent =' + activeTask.timeSpent)
        //     // console.log('active since ' + activeSince)
        //      console.log('date now = '+dateNow)
        //     // console.log('this is actve task' + task.id)
        //     activeTask.timeSpent = activeTask.timeSpent + (dateNow - activeSince);
        //     //task.timeSpent= timeSpent;
        //     console.log('active time spent after calculation =' + activeTask.timeSpent)
        // }
        
    },[ secs, mins, hrs, activeTask.timeSpent, activeTask.id, activeSince, task.id ])

    // if (task.id === parseInt(activeTask.id) ){
    //     setIsUpdated(true)
    // }

    if( (task.id === parseInt(activeTask.id)) && isActive === false){
        setIsActive(true);
    }
    
    const dateNow = (new Date()).getTime();

    useEffect(() => {
        //console.log('useeffect 2')
        let interval = null;
        if ( isActive && (task.id === parseInt(activeTask.id)) ) {
        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            //console.log(3)
            if(seconds >= 59){
                console.log(4)
                setminutes(minutes => minutes +1);
                console.log(5)
                setSeconds(0);
                console.log(6)
                if(minutes >= 59){
                    console.log(7)
                    sethours(hours => hours +1);
                    console.log(8)
                    setminutes(0);
                    console.log(9)
                }
            }
            console.log('is updated = '+ isUpdated)
            console.log('date now = '+ dateNow)
            console.log((new Date()).getTime())
            //console.log(10)
            // let totalTimeSpent = (seconds*1000)+(minutes*60*1000)+(hours*3600*1000);
            // task.timeSpent = totalTimeSpent;
            //console.log((new Date()).getTime());
        }, 1000);
        } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
        }
        
        return () => clearInterval(interval);
        
    }, [ isActive, seconds, minutes, hours, isUpdated, activeTask.id, task.id, task.timeSpent, dateNow ]);

    //console.log('render reached end')

    switch(task.id){
        case activeTask.id:
            //console.log('render active task')
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
            console.log('render default')
            return (
                <div className="">
                <div className="">
                    <h5 className='fw3 white b'>Time Spent: {hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
                    {seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})} </h5>
                </div>
                {/* <div className="">
                    <button className='' onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
                    <button className='' onClick={reset}>Reset</button>
                </div> */}
                </div>
            );
    }

};
