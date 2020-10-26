import React from 'react';
//import { TaskList } from '../TaskList';
import { connect } from 'react-redux';
import { selectItem, UpdateExp, UpdateTaskStatus, SetActiveTask, ShipItems, ChangeNav } from '../actions';
import { DONE, ACTIVE, PAUSED, PENDING, UPDATE, ADD, REMOVE, COMPLETED } from '../constants';
import { pushChanges  } from '../functions';

const mapStateToProps = state => {
    return {
        itemID: state.values.itemID,
        exp: state.UpdateExpReducer.exp,
        status: state.UpdateTaskStatusReducer.taskStatus,
        activeTask: state.SetActiveTaskReducer.activeTask,
        activeSince: state.SetActiveTaskReducer.activeSince,
        db: state.items.record.items 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        },
        updateTaskStatus: (status) => {
            return dispatch(UpdateTaskStatus(status))
        },
        setActiveTask: (task) => {
            return dispatch(SetActiveTask(task))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskControls);

function TaskControls({ task, position, changeNav, updateExp, changeItemID, setActiveTask, activeSince, activeTask, shipItems, db }){

    const prevTimeSpent = task.timeSpent;

    function startTimer(){
        setActiveTask(task);
        task.status = ACTIVE;
        
    }

    function pauseTask(){
        const dateNow = (new Date()).getTime();
        setActiveTask({});
        task.status = PAUSED;
        task.timeSpent = prevTimeSpent + (dateNow - activeSince);
        console.log("previos time spent:, ", prevTimeSpent)
        console.log("time spent:, ", task.timeSpent)
    }

    function markAsDone(){
        const dateNow = (new Date()).getTime();
        task.status = DONE;
        task.timeSpent = prevTimeSpent + (dateNow - activeSince);
        updateExp(task.exp);
        pushChanges(UPDATE, task, "Tasks", shipItems);
        db.Completed.unshift(task);
        pushChanges(ADD, task, "Completed", shipItems);
        db.Tasks.splice(position,1);
        pushChanges(REMOVE, task, "Tasks", shipItems);
        const nav = {
            title: COMPLETED,
            view: "DETAILS",
            ID: task.id
        }
        changeNav(nav);
    }

    switch(task.status){
        case ACTIVE:
            console.log(activeTask.id === true)
            return (
                <div className='flex justify-center'>
                    <button className="button" onClick={pauseTask}>PAUSE</button>
                    <button className="button" onClick={markAsDone}>MARK DONE</button>
                </div>
            )
        case PAUSED:
            return (
                <div className='flex justify-center'>
                    <button className="button" onClick={startTimer}>CONTINUE</button>
                    <button className="button" onClick={markAsDone}>MARK DONE</button>
                </div>
            )
        case PENDING:
            console.log(typeof activeTask)
            console.log(activeTask.id)
            if(activeTask.id === undefined) {
                return (
                    <div className='flex justify-center'>
                        <button className="button" onClick={startTimer}>START</button>
                        <button className="button" onClick={markAsDone}>MARK DONE</button>
                    </div>
                )
            } else {
                return (
                    <div>
                    </div>)
            }   
        default:
            return <div></div>
    }
    // Different controls are displayed based on if a task is ongoing
}

