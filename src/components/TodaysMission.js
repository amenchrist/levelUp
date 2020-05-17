import React from 'react';
import { TODAY } from '../constants';
//import { TaskList } from '../TaskList';

function TodaysMission({ touchFunction }) {

    return (
        <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' title={TODAY} onClick={touchFunction}>
            <h2 className='tc'>Today's<br />Mission</h2>
        </div>
    );
}

export default TodaysMission;