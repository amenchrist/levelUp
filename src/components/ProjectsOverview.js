import React from 'react';
import { LIST } from '../constants';

export default function ProjectsOverview({ touchFunction, projects }) {

    return (
        <article className="h-100 center bg-white ba b--black-10" title="PROJECTS" data-view={LIST} onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">Missions</h1>
                <h2 className="f5 fw4 gray mt0">{ projects.length }</h2>
            </div>
        </article>
    );
}
