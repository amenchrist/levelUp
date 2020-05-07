import React from 'react';

export default function HomeButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white b--black-10 ba' title="OVERVIEW" onClick={touchFunction}>
            <h3 className='tc'>H</h3>
        </div>       
    )
}

