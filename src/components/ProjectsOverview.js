import React from 'react';


function ProjectsOverview({ touchFunction}) {
    
    return (
        <article className="h-100 center bg-white br1 ba b--black-10" title="PROJECTS" onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">Missions</h1>
                <h2 className="f5 fw4 gray mt0">12</h2>
            </div>
        </article>
    );
}

export default ProjectsOverview;