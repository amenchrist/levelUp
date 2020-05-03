import React from 'react';

export default function TasksButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white br1 pa3 pa4-ns mv3 ba b--black-10' title="TASKS" onClick={touchFunction}>
            <h1 className='tc'>T</h1>
        </div>       
    )
}

