import React from 'react';

function QuestionAndOptions({ question }) {
    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
            <h2>{question}</h2>
            <button class="button">YES</button>
            <button class="button">NO</button>
        </div>
    )
}