import React from 'react';

function StatsOverview({ touchFunction }) {

    return (
        <article className="w-90 h-50 center bg-white br1 pa3 pa4-ns ba b--black-10" title="STATS" onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">Amen Christ</h1>
                <h2 className="f5 fw4 gray mt0">Engineer</h2>
                <h2 className="f5 fw4 gray mt0">Exp: 50</h2>
            </div>
        </article>  
    );
}

export default StatsOverview;

