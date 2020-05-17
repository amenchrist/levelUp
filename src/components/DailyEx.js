import React from 'react';
//import { TaskList } from '../TaskList';

function DailyEx({ touchFunction }) {

    return (
        <div className='flex items-center justify-center h-100 w-100 center bg-white ' title="DAILY_EX" onClick={touchFunction} >
            <h4 className='tc'>Daily Exercises</h4>
        </div>
    );
}

export default DailyEx;