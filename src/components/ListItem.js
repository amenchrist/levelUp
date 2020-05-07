import React from 'react';
import { PROJECT, TASK, INBOX_ITEM } from '../constants';


export default function ListItem( { touchFunction, item }){    

    switch(item.type){
        case PROJECT:
            return (
                <div className='bb' id={item.id} onClick={touchFunction}>
                    <h3>{item.name}</h3>
                    <p>{item.goal}</p>
                </div>
            )
        case TASK:
            return (
                <div className='bb' id={item.id} onClick={touchFunction}>
                    <h3>{item.name}</h3>
                    <p>{item.associatedProject.name}</p>
                </div>
            )
        case INBOX_ITEM:
            return (
                <div className='bb' id={item.id} onClick={touchFunction}>
                    <h3>{item.input}</h3>
                    <p>{item.entryDate}</p>
                </div>
            )
        default:
            return (
                <div className='bb' title='new item' onClick={touchFunction}>
                    <h3>Enter New Item</h3>
                </div>
            )
    }
}

