import React, { useState } from 'react';

export default function QuestionandInput({ question, submitFunction }) {

    const [ answer, setAnswer ] = useState('');

    function submit(event) {

        if(answer !==''){
            submitFunction(answer);
            setAnswer('');
        }
        event.preventDefault();

    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
            <h2>{question}</h2>
            <form onSubmit={submit}>
                <input type='text' value={answer} onChange={(e)=> setAnswer(e.target.value)} />
            </form>
        </div>
    )
}