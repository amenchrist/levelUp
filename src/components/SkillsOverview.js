import React from 'react';

function SkillsOverview({ touchFunction }) {

    function passTitle(e) {
        let targ = e.target;
        checkForTitle(targ)
        function checkForTitle (t) {
            if (t.title) {
                 touchFunction(t.title);
            } else {
                t = t.parentNode;
                checkForTitle (t);   
            }
        }
    }

    return (
        <article className="w-40 center bg-white br1 ba b--black-10" title="SKILLS" onClick={passTitle}>
            <div className="tc">
                <h1 className="f3 mb2">Lvl 1</h1>
                <h2 className="f5 fw4 gray mt0">Skills</h2>
            </div>
        </article>
    );
}

export default SkillsOverview;