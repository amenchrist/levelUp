import React from 'react';

export default function QuestionAndOptions({ question, yes, no }) {
    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
            <h2>{question}</h2>
            <button className="button" onClick={yes}>YES</button>
            <button className="button" onClick={no} >NO</button>
        </div>
    )
}