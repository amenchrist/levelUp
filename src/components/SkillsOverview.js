import React from 'react';

function SkillsOverview({ touchFunction }) {

    return (
        <article className="w-40 center bg-white ba b--black-10" title="SKILLS" onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">Lvl 1</h1>
                <h2 className="f5 fw4 gray mt0">Skills</h2>
            </div>
        </article>
    );
}

export default SkillsOverview;