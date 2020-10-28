import React from 'react';
import { LIST, TODAY } from '../constants';

export default function TodaysMission({ touchFunction }) {

    return (
        <div className='flex items-center justify-center h-100 w-100 center bg-white pa1' data-view={LIST} title={TODAY} onClick={touchFunction}>
            <h2 className='tc'>Today's<br />Mission</h2>
        </div>
    );
}
