import React from 'react';
import { InboxItems } from '../InboxItems';
import Processor from '../containers/Processor'

export default function ItemDetails({ id, touchFunction }) {

    let item = {};
    let nextItemID = null;
    for (let i=0; i<InboxItems.length; i++){

        if (InboxItems[i].id === id){
           item = InboxItems[i];
           nextItemID = InboxItems[i+1].id;
           break;
        }
    }
    return (
        <div >
            <h5>ID: {item.id}</h5>
            <h5>Name: {item.name}</h5>
            <h5>Entry Date: {item.entryDate} </h5>
            <p>Description: {item.description}</p>
            <h5>status: {item.status} </h5>
            <Processor item={item} nextItemID={nextItemID} touchFunction={touchFunction} />
        </div>
    );
}