import React from 'react';

export default function ProjectsButton({touchFunction}) {
    return (
        <div className='w-20 center bg-white br1 pa3 pa4-ns mv3 ba b--black-10' title="PROJECTS" onClick={touchFunction}>
            <h3 className='tc'>P</h3>
        </div>       
    )
}

