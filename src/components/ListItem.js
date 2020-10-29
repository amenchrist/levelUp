import React from 'react';
import { connect } from 'react-redux';
import { PROJECT, TASK, INBOX_ITEM, TASKS, DONE, COMPLETED, DETAILS, PROJECTS, INBOX, TRASH, CALENDAR, MISSION_TASKS } from '../constants';
import { displayDays } from '../functions';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        itemID: state.values.itemID,
        db: state.items.record.items,
        state: state.values
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);

function ListItem( { touchFunction, item, title }){

    switch(true){
        case item.type === PROJECT && !item.isTrashed:
            //let days = parseInt(Math.floor(total_hours / 24));
            let days = (item.dueDate / (1000*60*60*24)) % 7;
            console.log('days: ', days);
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' title={item.isTrashed ? TRASH : PROJECTS} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80 '>
                        <p className='fw7 b white pb2'>{item.name}</p>
                        <p className='fw3 white'>Due: {displayDays(item.dueDate)}, Tasks: {item.taskList.length}</p>
                    </div>
                    <div>
                        <p className='gold fw7 b'>EXP</p>
                    </div>
                </div>
            )
        case item.type === TASK && !item.isTrashed:
            let nextTitle;
            item.status === DONE ? nextTitle = COMPLETED : nextTitle = TASKS;
            if(title === PROJECTS){nextTitle = MISSION_TASKS};
            console.log(nextTitle);
            return (
                <div className='ba pa2 listItem w-100 flex justify-between items-center b--grey min-h-50' data-view={DETAILS}  title={nextTitle} id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>{title === CALENDAR ? new Date(item.dueDate).toDateString() : item.requiredContext}</p>
                    </div>
                    <div>
                        <p className='gold fw7 b'>{item.status}</p>
                    </div>
                </div>
            )
        case item.type === INBOX_ITEM && !item.isTrashed:
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' 
                title={item.isTrashed ? TRASH : INBOX} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>{(new Date(item.entryDate)).toLocaleDateString()}</p>
                    </div>
                    <div className='pa2' >
                        <p className='fw7 b bg-white pa2'>PROCESS</p>
                    </div>
                </div>
            )
        case item.isTrashed:
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' 
                title={TRASH} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>DELETED: {(new Date(item.trashedDate)).toLocaleString()}</p>
                    </div>
                    <div className='pa2' >
                        <p className='fw7 b bg-white pa2'>{item.type}</p>
                    </div>
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

