import React, { useState } from 'react';
import { INBOX_ITEM, TASK, INBOX } from '../constants';
import { db } from '../db'
import NewTask from './NewTask';
import NewMission from './NewMission';

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

    const [ type, setType ] = useState('INBOX_ITEM');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    function reset(){
        setType(INBOX_ITEM);
        setName('');
        setDescription('');
    }

    function submitNewItem(event) {
        let i = new Item(name, description);
        db.unshift(i);
        submitFunction(event);
        reset();
        event.preventDefault();
    }
    
    function displayTypeForm(){
        switch(true) {
            case type === TASK:
                return <NewTask />
            case type === 'MISSION':
                return <NewMission />
            default:
                return (
                    <div className='h-100 w-100 center ba b--black-10'>
                        <h1 className='tc'>NEW ITEM</h1>
                        <form onSubmit={submitNewItem} className='flex flex-column' title={INBOX}>
                            <input type='text' value={name} onChange={(e)=> setName(e.target.value)} />
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                            <input type='submit' value='submit' />
                        </form>
                    </div>
                )
        }
    }

    return (
        <div className='pa1'>
            <label htmlFor="type" className=''>Type:</label>
            <select id="type" value={type} onChange={(e)=> setType(e.target.value)}>
                <option value="INBOX_ITEM">INBOX</option>
                <option value="TASK">TASK</option>
                <option value="MISSION">MISSION</option>
                <option value="REFERENCE">REFERENCE</option>
                <option value="EXPENSE">EXPENSE</option>
                <option value="INCOME">INCOME</option>
            </select>
            {displayTypeForm()}
        </div>
    )
}