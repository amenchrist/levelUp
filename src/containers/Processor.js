import React, { useState } from 'react';

function Processor() {
    //actionable?
    //action
    //multistep?
    //done in 5?
    //delegatable?
    //project outcome

    const [ isActionable, setIsActionable ] = useState(true);
    const [ action, setAction ] = useState('');
    const [ isMultistep, setIsMultistep ] = useState(true);
    const [ isDoneInfive, setIsDoneInfive ] = useState(true);
    const [ isDelegatable, setIsDelegatable ] = useState(true);

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>

        </div>
    )
}