import React from 'react';
import { PROJECT, TASK, INBOX_ITEM, TASKS, DONE, COMPLETED, DETAILS, PROJECTS, INBOX } from '../constants';


export default function ListItem( { touchFunction, item }){

    switch(item.type){
        case PROJECT:
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' title={PROJECTS} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80 '>
                        <p className='fw7 b white pb2'>{item.name}</p>
                        <p className='fw3 white'>Due: {(new Date(item.dueDate)).toISOString().substr(0, 10)}, Tasks: {item.taskList.length}</p>
                    </div>
                    <div>
                        <p className='gold fw7 b'>EXP</p>
                    </div>
                </div>
            )
        case TASK:
            let nextTitle;
            item.status === DONE ? nextTitle = COMPLETED : nextTitle = TASKS;
            console.log(nextTitle);
            return (
                <div className='ba pa2 listItem w-100 flex justify-between items-center b--grey min-h-50' data-view={DETAILS}  title={nextTitle} id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>{item.requiredContext}</p>
                    </div>
                    <div>
                        <p className='gold fw7 b'>{item.status}</p>
                    </div>
                </div>
            )
        case INBOX_ITEM:
            return (
                <div className='ba pa2 listItem w-100 flex justify-between h-20 items-center b--grey min-h-50' title={INBOX} data-view={DETAILS}  id={item.id} onClick={touchFunction}>
                    <div className='w-80'>
                    <p className='fw7 b white pb2'>{item.name}</p>
                    <p className='fw3 white'>{(new Date(item.entryDate)).toISOString().substr(0, 10)}</p>
                    </div>
                    <div className='pa2' >
                        <p className='fw7 b bg-white pa2'>PROCESS</p>
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

