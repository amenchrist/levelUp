import React from 'react';
import { connect } from 'react-redux';
import { REFERENCE, COMPLETED, PROCESSED, INBOX, TRASH, REFERENCES, PROJECTS, TASKS, CALENDAR, SOMEDAY, WAITING_FOR, REMINDERS, TODAY, ASAP, MISSION_TASKS, TASK, PROJECT, REMINDER } from '../constants';
import NewItemButton from '../components/NewItemButton';
import ItemDetails from '../components/ItemDetails';
import TaskDetails from '../components/TaskDetails';
import ProjectDetails from '../components/ProjectDetails';
import BackButton from '../components/BackButton';
import PrevItemButton from '../components/PrevItemButton';
import NextItemButton from '../components/NextItemButton';
import ReferenceDetails from '../components/ReferenceDetails';
import { selectItem } from '../actions';
import TrashButton from '../components/TrashButton';
import CompletedItemDetails from '../components/CompletedItemDetails';
import TrashedItemDetails from '../components/TrashedItemDetails';
import ReminderDetails from '../components/ReminderDetails';


const mapStateToProps = state => {
    return {
        view: state.values.view,
        title: state.values.title,
        itemID: state.values.itemID,
        exp: state.UpdateExpReducer.exp,
        missionID: state.values.missionID,
        previousItemID: state.values.previousItemID,
        previousTitle: state.values.previousTitle,
        db: state.items.record.items 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}


function Details( { db, itemID, touchFunction, updateExp, selectAnother, title, changeItemID, previousItemID, previousTitle, missionID  }){
    
    let content;

    // DETERMINE CONTENT LIST
    switch(title) {
        case INBOX:
            content = db.Inbox
        break;
        case PROJECTS:
            content = db.Projects
        break;
        case TASKS:
            content = db.Tasks
        break;
        case COMPLETED:
            content = db.Completed
        break;
        case REFERENCES:
            content = db.References
        break;
        case CALENDAR:
            content = db.Tasks.concat(db.Projects)
        break;
        case ASAP:
            content = db.Tasks
        break;
        case TODAY:
            content = db.Tasks
        break;
        case WAITING_FOR:
            content = db.WaitingFor
        break;
        case SOMEDAY:
            content = db.Someday;
        break;
        case REMINDERS:
            content = db.Reminders;
        break;
        case PROCESSED:
            content = db.Processed;
        break;
        case TRASH:
            content = db.Trash;
        break;
        default:
            content = []
    }

    //SPECIAL CONDITION FOR MISSION'S LIST
    if(title === MISSION_TASKS) {

        content = getTasks(getproject(parseInt(missionID)), db.Tasks);

        function getproject(projID){
            console.log("proj id: ", projID)
            let proj = {};
            for (let x=0; x < db.Projects.length; x++){
                if (db.Projects[x].id === projID){
                    proj = db.Projects[x];
                }
            }
            console.log("proj = ", proj)
            return proj;
            
        }
        function getTasks(project, TaskList){
            console.log("proj tasks: ", project.taskList)
            let tasks = [];
            if(project.taskList !== []){
                for(let i=0; i<project.taskList.length; i++){
                    for(let j=0; j<TaskList.length; j++){
                        if(project.taskList[i] === TaskList[j].id ){
                            tasks.push(TaskList[j]);
                            break;
                        }
                    }
                }
            }
            console.log(tasks);
            return tasks;
        }
    }

    console.log("content list from details: ", content)

    // FIND ITEM
    let item = {};
    let prev;
    let next;
    const id = parseInt(itemID);
    for (let i=0; i<content.length; i++){
        //console.log("entering loop. Iteration: ", i)
        
        if (content[i].id === id){
            item = content[i];
            //console.log("item from loop: ", item)

            // ASSIGN THE PREV AND NEXT ITEM IDS
            i === 0 ? prev = content[i].id : prev = content[i-1].id;
            i === (content.length-1) ? next = content[i].id : next = content[i+1].id;
        }

    }

    // CHOOSE DETAILS FORMAT FOR DIFFERENT LIST OR ITEM TYPES
    switch(title) {
        case PROJECTS:
            return (
                <div className='w-100 h-100 center br1 pa2 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>PROJECT</h2>
                    <ProjectDetails project={item} touchFunction={touchFunction} updateExp={updateExp}/>
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={changeItemID} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={changeItemID} nextID={next} currentID={itemID} />
                    </div>
                    
                </div>
            )
        case TASKS:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>TASK</h2>
                    <TaskDetails id={parseInt(itemID)} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case MISSION_TASKS:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>MISSION TASKS</h2>
                    <TaskDetails id={parseInt(itemID)} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case INBOX:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>Inbox Item</h2>
                    <ItemDetails id={parseInt(itemID)} touchFunction={touchFunction} selectAnother={selectAnother} prevID={prev} nextID={next} />
                </div>        
            )
        case PROCESSED:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>PROCESSED</h2>
                        <h5 className='white b pb2'>Name: {item.name}</h5>
                        <h5 className='white pb2'>Processed: {(new Date(item.processedDate)).toLocaleString()} </h5>
                        {/* <h5 className='white pb2'>Status: {item.status} </h5> */}
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>        
            )
        case REFERENCES:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h1 className='tc b gold'>REFERENCE</h1>
                    <ReferenceDetails id={parseInt(itemID)} reference={item} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case REMINDERS:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h1 className='tc b gold'>REMINDER</h1>
                    <ReminderDetails id={parseInt(itemID)} item={item} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case SOMEDAY:
            if (item.type === TASK){
                console.log("someday item is a task")
                return (
                    <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                        <div className='flex justify-between items-center'>
                            <BackButton id={0} />
                            <TrashButton />
                        </div>
                        <h2 className='tc b gold f3'>TASK</h2>
                        <TaskDetails id={parseInt(itemID)} />
                        <div className='flex justify-between self-end'>
                            <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                            <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                        </div>
                    </div>
                )
            } else if (item.type === PROJECT) {
                console.log("someday item is this project = ", item)
                return (
                    <div className='w-100 h-100 center br1 pa2 ba b--black-10'>
                        <div className='flex justify-between items-center'>
                            <BackButton id={0} />
                            <TrashButton />
                        </div>
                        <h2 className='tc b gold f3'>PROJECT</h2>
                        <ProjectDetails project={item} touchFunction={touchFunction} updateExp={updateExp}/>
                        <div className='flex justify-between self-end'>
                            <PrevItemButton selectAnother={changeItemID} prevID={prev} currentID={itemID} />
                            <NextItemButton selectAnother={changeItemID} nextID={next} currentID={itemID} />
                        </div>
                        
                    </div>
                )
            }
        case COMPLETED:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>COMPLETED</h2>
                    <CompletedItemDetails item={item} ProjectList={db.Projects}/>
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            );
        case TRASH:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between'>
                        <BackButton id={0} />
                    </div>
                    <h2 className='tc b gold f3'>TRASHED</h2>
                    <TrashedItemDetails item={item} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            );
        default:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 pb2'>
                    <BackButton />
                    <h1 className='tc b white'>Error</h1>
                    <p>Item Not Found</p>
                    <NewItemButton touchFunction={touchFunction} />
                </div>        
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);