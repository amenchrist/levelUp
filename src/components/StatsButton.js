import React from 'react';

export default function StatsButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white b--black-10 ba' title="STATS" onClick={touchFunction}>
            <h3 className='tc'>S</h3>
        </div>       
    )
}

