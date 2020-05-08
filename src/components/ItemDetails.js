import React from 'react';
import { db } from '../db';

export default function ItemDetails({ id }) {

    let item = {};

    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
           item = db[i];
           break;
        }
    }

    return (
        <div>
            <div >
                <h5>ID: {item.id}</h5>
                <h5>Name: {item.name}</h5>
                <h5>Entry Date: {item.entryDate} </h5>
                <p>Description: {item.description}</p>
            </div>
        </div>
    );
}