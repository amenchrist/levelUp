import React from 'react';
import { connect } from 'react-redux';
import { PROJECT, TASK, INBOX_ITEM, REFERENCE, COMPLETED, PROCESSED, DONE, INBOX, TRASH, REFERENCES, PROJECTS, TASKS } from '../constants';
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
import { calculateTime } from '../functions';


const mapStateToProps = state => {
    return {
        view: state.values.view,
        title: state.values.title,
        itemID: state.values.itemID,
        exp: state.UpdateExpReducer.exp,
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


function Details( { db, itemID, touchFunction, updateExp, selectAnother, title, changeItemID }){
    let itemType;
    let item = {};
    let prev = itemID;
    let next = itemID;
    const id = parseInt(itemID);
    let content = db.Inbox
    const ProjectList = db.Projects

    console.log("type of item id: ", typeof itemID)

    switch(title) {
        case PROJECTS:
            content = db.Projects
            console.log("Project list from details: ", content)
        break;
        case TASKS:
            content = db.Tasks
            console.log("list from details: ", content)
        break;
        case COMPLETED:
            content = db.Completed
            console.log("Completed list from details: ", content)
        break;
        case REFERENCES:
            content = db.References
        break;
        case TRASH:
            content = db.Trash
        break;
        default:
            content = db.Inbox
    }
    console.log("content list from details: ", content)

    for (let i=0; i<content.length; i++){
        console.log(content[i].id)
        if (content[i].id === id){
            console.log(content[i].id)
            itemType = content[i].type;
            item = content[i];
            console.log("item from loop: ", item)
            i === 0 ? prev = content[i].id : prev = content[i-1].id;
            i === (content.length-1) ? next = content[i].id : next = content[i+1].id;
        }
    }

    switch(title) {
        case PROJECTS:
            return (
                <div className='w-100 h-100 center br1 pa2 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
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
                    <h2 className='tc b gold f3'>Task</h2>
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
        case (PROCESSED):
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
        case REFERENCE:
            return (
                <div className='h-100 w-100 center br1 ba b--black-10'>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h1 className='tc b gold'>REFERENCE</h1>
                    <ReferenceDetails id={parseInt(itemID)} />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prev} currentID={itemID} />
                        <NextItemButton selectAnother={selectAnother} nextID={next} currentID={itemID} />
                    </div>
                </div>
            )
        case COMPLETED:
            console.log("reached completed stage");
            let associatedProject = {}
            if(item.associatedProjectID === 0){
                associatedProject.name = "Getting Things Done";
            } else if (item.associatedProjectID > 0){
                for(let i=0; i<ProjectList.length; i++){
                    if(parseInt(item.associatedProjectID) === parseInt(ProjectList[i].id)){
                        associatedProject = ProjectList[i];
                        console.log('associated project name: ', associatedProject.name)
                        break;
                    }
                }
            }
            return (
                <div className='h-100 w-100 center br1 ba b--black-10 content-between '>
                    <div className='flex justify-between items-center'>
                        <BackButton id={0} />
                        <TrashButton />
                    </div>
                    <h2 className='tc b gold f3'>COMPLETED</h2>
                    <div className='' >
                    <div>
                        <div className='w-100 pa2 pb3' >
                            <h3 className='fw7 b white pb2'>{item.name}</h3>
                            <h4 className='fw1 white'>{item.requiredContext}</h4>
                            
                        </div>
        
                        <div className='w-100 pl2 pb3'>
                            <h5 className='fw3 white'>Mission: </h5>
                            <h4 className='fw5 white'>{associatedProject.name}</h4>
                        </div>
        
                        <div className='w-100 pl2 pb3'>
                            <h5 className='fw3 white'>Outcome: </h5>
                            <h5 className='fw3 white'>{item.outcome} </h5>
                        </div>
                        <div className='w-100 pl2 pb3 flex justify-between'>
                            <h5 className='fw3 white'>Time Spent: {calculateTime(item.timeSpent)}</h5>
                            <h5 className='fw3 white'>Due Date: {item.dueDate} </h5>
                        </div>
                        <div className='w-100 pl2 pb3 flex justify-between'>                    
                            {/* <h5 className='fw3 white'>Time Required: {task.timeRequired}</h5>
                            <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                        </div>
                        <h5 className='fw3 white'>Status: {item.status}</h5>
                        <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                        <div className='pa2'>
                            <p className='fw3 white'>{item.note}</p>
                        </div>
                    </div>
                </div>
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