import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ADD, DETAILS, EVENTS } from '../constants';
import { selectView, selectItem, ChangeNav, ShipItems } from '../actions';
import {  Event } from '../classes';
import { pushChanges, convertDateToMilliseconds  } from '../functions';

const mapStateToProps = state => {
    return {
        view: state.values.view,
        itemID: state.values.itemID,
        db: state.items.record.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

function NewEvent({ updateExp, shipItems, changeNav, db }) {

    const Events = db.Events;

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState('');
    const [ note, setNote ] = useState('');
    const [ date, setDate ] = useState(today);



    function submitNewItem(event) {
        
        let r = new Event( name, convertDateToMilliseconds(date), note );
        console.log(r);
        //Events.unshift(r);
        pushChanges(ADD, r, "Events", shipItems);
        updateExp(5);
        event.preventDefault();

        const nav = {
            title: EVENTS,
            view: DETAILS,
            ID: r.id
        }

        changeNav(nav);
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW EVENT</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={EVENTS}>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <textarea className='pa2 mb1' placeholder='Note' value={note} onChange={(e) => setNote(e.target.value)} />
                <label className='fw4 white' htmlFor="due date" >Due Date:</label>
                <input className='pa2 mb1' id='due date' type='date' min={today} value={date} onChange={(e) => setDate(e.target.value)} />
                <input className='pa2 mb1'type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);