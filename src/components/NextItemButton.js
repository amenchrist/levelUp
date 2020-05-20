import React from 'react';

export default function NextItemButton({ selectAnother, nextID, currentID }){
    if(currentID !== nextID){
        return (
            <div className='whiteB w3 h3 flex items-center justify-center' onClick={() => selectAnother(nextID)}>
                <h2 className=' white b f8 fw9 ma0'>Next</h2>
            </div>
        )
    } else {
        return (
            <div className='ba bw1 b--silver w3 h3 flex items-center justify-center' >
                <h2 className=' gray b f8 fw9 ma0'>Next</h2>
            </div>
        )
    }
}
