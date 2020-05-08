import React from 'react';

function QuestionandInput({ question }) {
    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
            <h2>{question}</h2>
            <form>
                <input type='text' />
            </form>
        </div>
    )
}