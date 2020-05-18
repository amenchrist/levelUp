import React from 'react';
import { TaskList } from '../TaskList';
import { DONE } from '../constants';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp } from '../actions';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        previousView: state.selectViewReducer.previousView,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);


function TaskDetails({ id , changeItemID, updateExp }) {

    const db = TaskList;
    let task = {};
    let position;

    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
           task = db[i];
           position = i;
           break;
        }
    }

    function startTimer(){
        //
    }

    function markAsDone(){
        task.status = DONE;
        TaskList.splice(position,1);
        updateExp(task.exp);
        changeItemID(0);

    }

    return (
        <div>
            <div className='lightup' >
                {/* <h5>ID: {task.id}</h5> */}
                <input type="checkbox" value="Done"></input>
                <h3>{task.name}</h3>
                <h5>{task.requiredContext}</h5>
                {/* <h5><span id={task.associatedProject.id} onClick={touchFunction}>{task.associatedProject.name}</span></h5> */}
                <h4>Outcome: {task.outcome} </h4>
            </div>
            <div >
                <h5>Due Date: {(new Date(task.dueDate)).toISOString().substr(0, 10)}</h5>
                <h5>Time Required: {task.timeRequired}</h5>
                <h5>Status: {task.status}</h5>
            </div>
            <div className='bt bb'>
                <h5>Note</h5>
                <p>{task.note}</p>
            </div>
            <button className="button" onClick={startTimer}>START</button>
            <button className="button" onClick={markAsDone}>DONE</button>
            {/* <div>
                <h5>Next Action: </h5>
                <p>{project.nextAction}</p>
            </div>
            <div>
                <h5>Task List</h5>
                <p>{project.taskList}</p>
            </div> */}
        </div>
    );
}

