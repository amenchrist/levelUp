import React from 'react';
import { PROJECT, TASK, INBOX_ITEM } from '../constants';
import NewItemButton from '../components/NewItemButton';
import ItemDetails from '../components/ItemDetails';
import TaskDetails from '../components/TaskDetails';
import ProjectDetails from '../components/ProjectDetails';
import BackButton from '../components/BackButton';

export default function Details( { content, itemID, touchFunction, updateExp }){
    let itemType, item;
    let db = content;
    const id = parseInt(itemID);
    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
        itemType = db[i].type;
        item = db[i];
        break;
        }
    }
    switch(itemType) {
        case PROJECT:
            return (
                <div className='w-100 center br1 pa3 ba b--black-10'>
                    <BackButton />
                    <ProjectDetails project={item} touchFunction={touchFunction} updateExp={updateExp}/>
                    
                </div>        
            )
        case TASK:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <BackButton />
                    <h1 className='tc'>Task</h1>
                    <TaskDetails id={parseInt(itemID)} />
                    
                </div>        
            )
        case INBOX_ITEM:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <BackButton />
                    <h1 className='tc'>Inbox Item</h1>
                    <ItemDetails id={parseInt(itemID)} touchFunction={touchFunction} />
                    <NewItemButton touchFunction={touchFunction} />
                </div>        
            )
        default:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <BackButton />
                    <h1 className='tc'>Error</h1>
                    <p>Item Not Found</p>
                    <NewItemButton touchFunction={touchFunction} />
                </div>        
            )
    }
}