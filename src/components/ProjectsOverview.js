import React from 'react';


function ProjectsOverview({ onTouch }) {
    // return target.parentNode
    // if parentnode.title doesnt exist, return 

    function passTitle(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForTitle(targ)
        function checkForTitle (t) {
            if (t.title) {
                onTouch(t.title);
            } else {
                t = t.parentNode;
                checkForTitle (t);   
            }
        }
    }
    
    return (
        <article className="w-40 center bg-white br1 ba b--black-10" title="PROJECTS" onClick={passTitle}>
            <div className="tc">
                <h1 className="f3 mb2">Projects</h1>
                <h2 className="f5 fw4 gray mt0">1/6</h2>
            </div>
        </article>
    );
}

export default ProjectsOverview;