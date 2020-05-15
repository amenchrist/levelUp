import React from 'react';
import { TaskList } from '../TaskList';

function TaskOverview({ touchFunction }) {

    return (
        <article className="h-100 center bg-white ba b--black-10" title="TASKS" onClick={touchFunction}> 
            <div className="tc">
                <h1 className="f3 mb2">Tasks</h1>
                <h2 className="f5 fw4 gray mt0">{ TaskList.length }</h2>
            </div>
        </article>
    );
}

export default TaskOverview;