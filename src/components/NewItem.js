import React, { useState } from 'react';
import { INBOX_ITEM, INBOX } from '../constants';
import { db } from '../db';

class Item{
    constructor(name,description='None') {
        const d= new Date();

        this.type = INBOX_ITEM;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.name = name;
        this.description = description;

    }
}

export default function NewItem({ submitFunction }) {

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    function submitNewItem(event) {
        let i = new Item(name, description);
        db.unshift(i);
        submitFunction(event)
        event.preventDefault();
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
            <h1 className='tc'>NEW ITEM</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={INBOX}>
                <input type='text' value={name} onChange={(e)=> setName(e.target.value)} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}