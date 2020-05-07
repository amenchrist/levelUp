import React from 'react';
import { InboxItems } from '../InboxItems';

export default function TaskDetails({ id }) {

    let item = {};

    for (let i=0; i<InboxItems.length; i++){

        if (InboxItems[i].id === id){
           item = InboxItems[i];
           break;
        }
    }

    return (
        <div>
            <div >
                <h5>ID: {item.id}</h5>
                <h5>Name: {item.input}</h5>
                <h5>Entry Date: {item.entryDate} </h5>
                <p>Description: {item.description}</p>
            </div>
        </div>
    );
}