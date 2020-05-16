import React from 'react';
import { TaskList } from '../TaskList';



export default function TaskDetails({ id , touchFunction }) {

    const db = TaskList;
    let task = {};

    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
           task = db[i];
           break;
        }
    }

    function startTimer(){
        //
    }

    return (
        <div>
            <div className='lightup' >
                {/* <h5>ID: {task.id}</h5> */}
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