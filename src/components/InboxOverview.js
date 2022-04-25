import React from 'react';
import { LIST, PROCESSED } from '../constants';

export default function InboxOverview({ touchFunction , inbox }) {

    let content = inbox.filter((i) => (i.isTrashed === false && i.status !== PROCESSED));

    return (
        <article className="h-100 center bg-white br1 ba b--black-10" data-view={LIST} title="INBOX" onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">{ content.length }</h1>
                <h2 className="f5 fw4 gray mt0">Inbox</h2>
            </div>
        </article>
    );
}
