import React from 'react';

export default function TasksButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white b--black-10 ba' id="0" title="TASKS" onClick={touchFunction}>
            <h3 className='tc'>T</h3>
        </div>       
    )
}

