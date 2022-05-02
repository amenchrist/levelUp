import React from 'react';
import { DONE, LIST, SOMEDAY } from '../constants';

export default function TaskOverview({ touchFunction, tasks }) {

    let content = tasks.filter((t) => (t.isTrashed === false && t.status !== DONE) && t.dueDate !== SOMEDAY);

    return (
        <article className="h-100 center bg-white ba b--black-10" data-view={LIST} title="TASKS" onClick={touchFunction}> 
            <div className="tc">
                <h1 className="f3 mb2">Tasks</h1>
                <h2 className="f5 fw4 gray mt0">({ content.length })</h2>
            </div>
        </article>
    );
}