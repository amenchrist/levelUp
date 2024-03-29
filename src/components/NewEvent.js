import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ADD, DAILY, DETAILS, EVENTS, MONTHLY, NONE, WEEKLY, YEARLY } from '../constants';
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
    const [ date, setDate ] = useState(today);
    const [ time, setTime ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ frequency, setFrequency ] = useState("");
    const [ note, setNote ] = useState('');



    function submitNewItem(event) {
        
        let e = new Event( name, date, time, location, frequency );
        console.log(e);
        //Events.unshift(e);
        pushChanges(ADD, e, "Events", shipItems);
        updateExp(5);
        event.preventDefault();

        const nav = {
            title: EVENTS,
            view: DETAILS,
            ID: e.id
        }

        changeNav(nav);
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW EVENT</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={EVENTS}>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <label className='fw4 white' htmlFor="date" >Date:</label>
                <input className='pa2 mb1' id='date' type='date' min={today} value={date} onChange={(e) => setDate(e.target.value)} />
                <label className='fw4 white' htmlFor="time" >Time:</label>
                <input className='pa2 mb1' id='time' type='time' value={time} onChange={(e) => {setTime(e.target.value); console.log(time)}} />
                <label className='fw4 white' htmlFor="location" >Location:</label>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                <label className='fw4 white' htmlFor="frequency" >Frequency:</label>
                <select className='pa2 mb1' id="priority" value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
                    <option value="" disabled defaultValue>Frequency</option>
                    <option value={NONE}>ONE-TIME</option>
                    <option value={DAILY}>DAILY</option>
                    <option value={WEEKLY}>WEEKLY</option>
                    <option value={MONTHLY}>MONTHLY</option>
                    <option value={YEARLY}>YEARLY</option>
                </select>
                <textarea className='pa2 mb1' placeholder='Note' value={note} onChange={(e) => setNote(e.target.value)} />
                <input className='pa2 mb1'type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);