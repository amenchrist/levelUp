import React from 'react';

function TaskOverview({ touchFunction }) {

    return (
        <article className="h-100 center bg-white br1 ba b--black-10" title="TASKS" onClick={touchFunction}> 
            <div className="tc">
                <h1 className="f3 mb2">3/5</h1>
                <h2 className="f5 fw4 gray mt0">Tasks</h2>
            </div>
        </article>
    );
}

export default TaskOverview;