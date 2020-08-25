import React from 'react';
//import { ProjectList } from '../ProjectList';


function ProjectsOverview({ touchFunction, projects }) {
    
    return (
        <article className="h-100 center bg-white ba b--black-10" title="PROJECTS" onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">Missions</h1>
                <h2 className="f5 fw4 gray mt0">{ projects.length }</h2>
            </div>
        </article>
    );
}

export default ProjectsOverview;