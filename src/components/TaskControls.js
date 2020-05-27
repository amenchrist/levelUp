import React from 'react';
//import { TaskList } from '../TaskList';
import { connect } from 'react-redux';
import { selectItem, UpdateExp, UpdateTaskStatus, SetActiveTask } from '../actions';
import { DONE } from '../constants';

const mapStateToProps = state => {
    return {
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp,
        status: state.UpdateTaskStatusReducer.taskStatus,
        activeTask: state.SetActiveTaskReducer.activeTask
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
        setActiveTask: (id) => {
            return dispatch(SetActiveTask(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskControls);

function TaskControls({ task, status, updateTaskStatus, updateExp, changeItemID, setActiveTask }){

    function startTimer(){
        setActiveTask(task.id);
        //changeItemID(task.id);
    }

    function markAsDone(){
        task.status = DONE;
        //TaskList.splice(position,1);
        updateExp(task.exp);
        changeItemID(0);
    }

    switch(status){
        default:
            return (
                <div>
                    <button className="button" onClick={startTimer}>START</button>
                    <button className="button" onClick={markAsDone}>DONE</button>
                </div>
            )
    }
    // Different controls are displayed based on if a task is ongoing
}

