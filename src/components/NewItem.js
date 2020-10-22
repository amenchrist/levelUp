import React, { useState } from 'react';
import { INBOX_ITEM, TASK, INBOX, UNPROCESSED, MISSION, PROJECTS, TASKS } from '../constants';
//import  InboxItems  from '../InboxItems'
import NewTask from './NewTask';
import NewMission from './NewMission';
import { selectItem, ShipItems, selectTitle } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        view: state.values.view,
        title: state.values.title,
        itemID: state.values.itemID,
        db: state.items.record.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTitle: (title) => {
            return dispatch(selectTitle(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);


function NewItem({ submitFunction, title, updateExp, changeItemID, shipItems, db, changeTitle }) {

    // const [ type, setType ] = useState(title);
    const [ name, setName ] = useState('Enter item name');
    
    const InboxItems = db.Inbox;
    //console.log(InboxItems);

    function reset(){
        changeTitle(INBOX);
        setName('Enter item name');
        // setDescription('');
    }

    class Item{
        constructor(name,description='None') {
            const d= new Date();
    
            this.type = INBOX_ITEM;
            this.id = d.getTime();
            this.entryDate = d.getTime();
            this.name = name;
            this.description = '';
            this.status = UNPROCESSED;
    
        }
    }

    function submitNewItem(event) {
        if(name !== 'Enter item name' && name !== '' ){
            //console.log('name is set')
            let i = new Item(name);
            console.log(i)
            InboxItems.unshift(i);
            console.log("new inbox: ", InboxItems)
            updateExp(5);
            shipItems(i)
            changeItemID(i.id);
            submitFunction(event);
            reset();
            event.preventDefault();
        }
        event.preventDefault();
    }
    
    function displayTypeForm(){
        switch(true) {
            case title === TASKS:
                return <NewTask updateExp={updateExp} />
            case title === PROJECTS:
                return <NewMission updateExp={updateExp} />
            default:
                return (
                    <div className='h-100 w-100 center ba b--black-10 '>
                        <h1 className='tc gold b'>NEW ITEM</h1>
                        <form onSubmit={submitNewItem} className='flex flex-column' title={INBOX}>
                            <input type='text' onChange={(e)=> setName(e.target.value)} placeholder='Enter item name...' className='pa2 mb2' />
                            {/* <textarea value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                            <input type='submit' value='submit' />
                        </form>
                    </div>
                )
        }
    }

    return (
        <div className='pa1 w-100'>
            <button className="button w-20" onClick={(e)=> changeTitle(INBOX)}>INBOX</button>
            <button className="button w-20" onClick={(e)=> changeTitle(TASKS)}>TASK</button>
            <button className="button w-20" onClick={(e)=> changeTitle(PROJECTS)}>MISSION</button>
            <button className="button w-20" onClick={(e)=> changeTitle(e.target.value)}>REF</button>
            <button className="button w-20" onClick={(e)=> changeTitle(e.target.value)}>FINANCE</button>
            {displayTypeForm()}
            {/* <label htmlFor="type" className=''>Type:</label>
            <select id="type" value={type} onChange={(e)=> setType(e.target.value)}>
                <option value="INBOX_ITEM">INBOX</option>
                <option value="TASK">TASK</option>
                <option value="MISSION">MISSION</option>
                <option value="REFERENCE">REFERENCE</option>
                <option value="EXPENSE">EXPENSE</option>
                <option value="INCOME">INCOME</option>
            </select> */}
        </div>
    )
}