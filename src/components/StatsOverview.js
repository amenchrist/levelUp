import React from 'react';

function StatsOverview({ touchFunction, exp }) {

    return (
        <article className="h-100 w-100 center bg-white pa2  " title="STATS" onClick={touchFunction}>
            <div className="tc w-100 h-100">
                <div></div>
                <h1 className="f2 mb0">Amen Christ</h1>
                <h3 className="f6 pa1 gray ">Engineer</h3>
                <h4 className="f6 gray ">Exp: {exp}</h4>
                <div className=" pt3 ">
                    <h2 className="pa1 ">Current Mission</h2>
                    <h2 className="pa1 yellow ">Current Task</h2>
                    <h2 className="pa1">12:45:34</h2>
                </div>
            </div>
        </article>  
    );
}

export default StatsOverview;

