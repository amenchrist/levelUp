import React from 'react';

export default function ProjectDetails({ project, touchFunction }) {
    
    return (
        <div>
            <div >
                <h5>ID: {project.id}</h5>
                <h3>Name: {project.name}</h3>
                <h5>Outcome: {project.outcome} </h5>
                <h5>Purpose: {project.purpose} </h5>
            </div>
            <div className=''>
                <h5>Note</h5>
                <p>{project.note}</p>
            </div>
            <div >
                <h5>Output: {project.output} </h5>
                <h5>Due Date: {project.dueDate}</h5>
                <h5>Time Required: {project.timeRequired}</h5>
                <h5>Status: {project.status}</h5>
                {/* <p>Time Remaining: {project.timeRemaining}</p> */}
            </div>
            <div>
                <h5>Next Action: </h5>
                {/* <h5><span id={project.nextAction.id} onClick={touchFunction}>{project.nextAction.task}</span></h5> */}
            </div>
            {/* <div>
                <h5>Task List</h5>
                <p>{project.taskList}</p>
            </div> */}
        </div>
    );
}