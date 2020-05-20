import React from 'react';
import { PROJECT, TASK, INBOX_ITEM } from '../constants';
import NewItemButton from '../components/NewItemButton';
import ItemDetails from '../components/ItemDetails';
import TaskDetails from '../components/TaskDetails';
import ProjectDetails from '../components/ProjectDetails';
import BackButton from '../components/BackButton';
import PrevItemButton from '../components/PrevItemButton';
import NextItemButton from '../components/NextItemButton';

export default function Details( { content, itemID, touchFunction, updateExp, selectAnother }){
    let itemType, item;
    let prev = itemID;
    let next = itemID;
    let db = content;
    const id = parseInt(itemID);
    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
        itemType = db[i].type;
        item = db[i];

        if((db[i-1]) && db[i-1].type === itemType){
            prev = db[i-1].id;
        }
        if((db[i+1]) && db[i+1].type === itemType){
            next = db[i+1].id;
        }
        break;
        }
    }


    switch(itemType) {
        case PROJECT:
            return (
                <div className='w-100 center br1 pa3 ba b--black-10'>
                    <BackButton />
                    <ProjectDetails project={item} touchFunction={touchFunction} updateExp={updateExp}/>
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                    
                </div>        
            )
        case TASK:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <BackButton />
                    <h1 className='tc'>Task</h1>
                    <TaskDetails id={parseInt(itemID)} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>        
            )
        case INBOX_ITEM:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <BackButton />
                    <h1 className='tc'>Inbox Item</h1>
                    <ItemDetails id={parseInt(itemID)} touchFunction={touchFunction} />
                    <NewItemButton touchFunction={touchFunction} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
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