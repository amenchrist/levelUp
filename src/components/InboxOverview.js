import React from 'react';

export default function InboxOverview({ touchFunction , inbox }) {

    return (
        <article className="h-100 center bg-white br1 ba b--black-10" title="INBOX" onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">{ inbox.length }</h1>
                <h2 className="f5 fw4 gray mt0">Inbox</h2>
            </div>
        </article>
    );
}
