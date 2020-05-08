import React from 'react';
import { db } from '../db';



export default function TaskDetails({ id , touchFunction }) {

    let task = {};

    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
           task = db[i];
           break;
        }
    }

    return (
        <div>
            <div >
                <h5>ID: {task.id}</h5>
                <h5>Name: {task.name}</h5>
                <h5>Output: {task.output} </h5>
            </div>
            <div className='show'>
                <h5>Description</h5>
                <p>{task.description}</p>
            </div>
            <div >
                <h5>Associated Project: <span id={task.associatedProject.id} onClick={touchFunction}>{task.associatedProject.name}</span></h5>
                <h5>Due Date: {task.dueDate}</h5>
                <h5>Time Required: {task.timeRequired}</h5>
                <p>Status: {task.status}</p>
            </div>
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