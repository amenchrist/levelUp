import React from 'react';
import { ProjectList } from '../ProjectList';



export default function ProjectDetails({ id }) {

    let project = {};

    for (let i=0; i<ProjectList.length; i++){

        if (ProjectList[i].id === id){
           project = ProjectList[i];
           break;
        }
    }
    
    return (
        <div>
            <div >
                <h5>ID: {project.id}</h5>
                <h5>Name: {project.name}</h5>
                <h5>Goal: {project.goal} </h5>
            </div>
            <div className='show'>
                <h5>Description</h5>
                <p>{project.description}</p>
            </div>
            <div >
                <h5>Output: {project.output} </h5>
                <h5>Due Date: {project.dueDate}</h5>
                <h5>Time Required: {project.timeRequired}</h5>
                <p>Time Remaining: {project.timeRemaining}</p>
                <p>Status: {project.status}</p>
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