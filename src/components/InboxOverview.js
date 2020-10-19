import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp,
        db: state.items.record.items //state.RetrieveDBReducer.db
    }
}

function InboxOverview({ touchFunction , db }) {

    
    //console.log('inbox tile = ', db);
    let inbox = [];
    if (db.Inbox) {
        inbox = db.Inbox;
    }


    return (
        <article className="h-100 center bg-white br1 ba b--black-10" title="INBOX" onClick={touchFunction}>
            <div className="tc">
                <h1 className="f3 mb2">{ inbox.length }</h1>
                <h2 className="f5 fw4 gray mt0">Inbox</h2>
            </div>
        </article>
    );
}

export default connect(mapStateToProps)(InboxOverview);