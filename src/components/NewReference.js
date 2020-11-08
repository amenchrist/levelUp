import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ADD, DETAILS, REFERENCES, REFERENCE } from '../constants';
import { selectView, selectItem, ChangeNav, ShipItems } from '../actions';
import { Reference } from '../classes';
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

function NewReference({ updateExp, shipItems, changeNav, db }) {

    const References = db.References;

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ dueDate, setDueDate ] = useState(today);


    function submitNewItem(event) {
        
        let r = new Reference(name, details );
        console.log(r);
        References.unshift(r);
        pushChanges(ADD, r, "References", shipItems);
        updateExp(5);
        event.preventDefault();

        const nav = {
            title: REFERENCES,
            view: DETAILS,
            ID: r.id
        }

        changeNav(nav);
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW REFERENCE</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={REFERENCE}>
                <input className='pa2 mb1' autoFocus type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <textarea className='pa2 mb1' placeholder='Details' value={details} onChange={(e) => setDetails(e.target.value)} />
                <input className='pa2 mb1'type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReference);