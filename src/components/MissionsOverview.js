import React from 'react';
import { DONE, LIST, MISSIONS, SOMEDAY } from '../constants';

export default function MissionsOverview({ touchFunction, missions }) {

    let content = missions.filter((m) => (m.isTrashed === false && m.status !== DONE) && m.dueDate !== SOMEDAY);

    return (
        <article className="h-100 center bg-white ba b--black-10" title={MISSIONS} data-view={LIST} onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">Missions</h1>
                <h2 className="f5 fw4 gray mt0">({ content.length })</h2>
            </div>
        </article>
    );
}
