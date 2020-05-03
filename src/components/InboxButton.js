import React from 'react';

export default function InboxButton({ touchFunction }) {
    return (
        <div className='w-20 center bg-white br1 pa3 pa4-ns mv3 ba b--black-10' title="INBOX" onClick={touchFunction}>
            <h1 className='tc'>I</h1>
        </div>       
    )
}

