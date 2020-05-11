import React from 'react';

export default function ProjectsButton({touchFunction}) {
    return (
        <div className='w-20 center bg-white ba b--black-10' title="PROJECTS" onClick={touchFunction}>
            <h3 className='tc'>P</h3>
        </div>       
    )
}
