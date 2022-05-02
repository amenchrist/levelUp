import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PENDING, LOW, MEDIUM, HIGH, MISSION, ADD, MISSIONS, DETAILS, SOMEDAY } from '../constants';
import { selectView, selectItem, ChangeNav, ShipItems } from '../actions';
import { Mission } from '../classes';
import { pushChanges, convertDateToMilliseconds  } from '../functions';
import DatePicker from './DatePicker';

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

function NewMission({ updateExp, shipItems, changeNav, db }) {

    const MissionsList = db.Missions;

    let today = new Date().toISOString().substr(0, 10);

    const [ purpose, setPurpose ] = useState('');
    const [ outcome, setOutcome ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ dueDate, setDueDate ] = useState(SOMEDAY);
    const [ priority, setPriority ] = useState('');
    const [ requirements, setRequirements ] = useState('');


    function submitNewItem(event) {
        
        let m = new Mission(outcome.trim(), purpose, dueDate, requirements, priority);
        console.log(m);
        MissionsList.unshift(m);
        pushChanges(ADD, m, "Missions", shipItems);
        updateExp(5);
        event.preventDefault();
        //console.log(m)

        const nav = {
            title: MISSIONS,
            view: DETAILS,
            ID: m.id
        }

        changeNav(nav);
    }

    
    

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW MISSION</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={MISSION}>
                {/* <input className='pa2 mb1' autoFocus type='text' placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} /> */}
                <input className='pa2 mb1' autoFocus type='text' placeholder='Outcome' value={outcome} onChange={(e) => setOutcome(e.target.value)} />
                <textarea className='pa2 mb1' placeholder='Details' value={details} onChange={(e) => setDetails(e.target.value)} />
                <textarea className='pa2 mb1' placeholder='What is the purpose of the mission?' value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                {/* <label className='fw4 white' htmlFor="due date" >Due Date:</label>
                <input className='pa2 mb1' id='due date' type='date' min={today} value={dueDate} onChange={(e) => setDueDate(e.target.value)} /> */}
                <DatePicker item={{}} dueDate={dueDate} updateFunc={setDueDate} />
                <select className='pa2 mb1' id="priority" value={priority} onChange={(e)=> setPriority(e.target.value)}>
                    <option value="" disabled defaultValue>Priority</option>
                    <option value={LOW}>Low</option>
                    <option value={MEDIUM}>Medium</option>
                    <option value={HIGH}>High</option>
                </select>
                <textarea className='pa2 mb1' placeholder='Requirements' value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                {/* <input type='text' placeholder='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <input type='text' placeholder='Associated MISSION name' value={associatedMISSION} onChange={(e) => setAssociatedMISSION(e.target.value)} /> */}
                <input className='pa2 mb1'type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMission);