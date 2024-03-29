import React, { useState } from 'react';
import QuestionAndOptions from '../components/QuestionAndOptions';
import QuestionandInput from '../components/QuestionAndInput';
import { Task, Mission, Reference, Event } from '../classes';
import { ReferenceList } from '../ReferenceList';
import {  PROCESSED, TASK, PENDING, UNPROCESSED, REFERENCE, ADD, UPDATE, REMOVE, REFERENCES, SOMEDAY, MISSIONS, TASKS, DETAILS, EVENTS, INBOX } from '../constants';
import { selectView, selectItem, ChangeNav, ShipItems } from '../actions';
import { connect } from 'react-redux';
import DatePicker from '../components/DatePicker';
import { pushChanges  } from '../functions';
import TaskControls from '../components/TaskControls';


//shipItems(items, agent, record)
//

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
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

function Processor({ nextItemID, item, touchFunction, changeItemID, itemIndex, db, shipItems, changeNav }) {

    const InboxItems = db.Inbox;
    const MissionList = db.Missions;
    const TaskList = db.Tasks;
    const SomedayList = db.Someday;
    const References = db.References;
    const Events = db.Events;

    

    const [ outcome, setOutcome ] = useState('');
    const [ requiredContext, setRequiredContext ] = useState('');
    const [ isActionable, setIsActionable ] = useState(null);
    const [ isMultistep, setIsMultistep ] = useState(null);
    const [ isDoneInFive, setIsDoneInFive ] = useState(null);
    const [ isDelegatable, setIsDelegatable ] = useState(null);
    const [ step, setStep ] = useState(0);
    const [ nextID, setNextID ] = useState(0);
    const [ isDoneInaYear, setIsDoneInaYear ] = useState(null);
    const [ newMissionID, setNewMissionID ] = useState(0);
    const [ newTaskID, setNewTaskID ] = useState(0);
    const [ newMission, setNewMission ] = useState(null);
    const [ newTask, setNewTask ] = useState(null);
    const [ assignedAgent, setAssignedAgent ] = useState(null);
    const [ dueDate, setDueDate ] = useState(null);
    const [ trashed, setTrashed ] = useState(false);
    const [ incubated, setIncubated ] = useState(false);
    const [ referenced, setReferenced ] = useState(false);
    const [ newReference, setNewReference ] = useState(null);
    const [ refDetails, setRefDetails ] = useState('');
    const [ newEvent, setNewEvent ] = useState(null);


    function makeNewMission(){
        let proj = new Mission( outcome );
        setNewMission(proj);
        setNewMissionID(proj.id);
        //MissionList.unshift(proj);
        // pushChanges(ADD, proj, "Missions");
        updateStatus();
        //InboxItems.splice(itemIndex,1);
        // pushChanges(REMOVE, item, "Inbox");
        setNextID(proj.id);
    }

    function makeNewTask(name){
        let asProjID;
        let theOutcome = outcome;
        if (isMultistep === true) {
            theOutcome = '';
            asProjID = newMissionID;
        }

        let task = new Task(name, theOutcome, requiredContext, asProjID);
        setNewTask(task);
        console.log("new task = ",task);
        updateStatus();
        setNextID(task.id);  

        //ADD TASK TO TASK LIST AND 
        //TaskList.unshift(task);
        pushChanges(ADD, task, "Tasks", shipItems);

        // InboxItems.splice(itemIndex,1);
        // pushChanges(REMOVE, item, "Inbox");
        setNewTaskID(task.id);  
    }

    function makeNewReference(name){ 

        let ref = new Reference(name);
        setNewReference(ref);
        console.log("new ref = ", ref);
        setNextID(ref.id); 

    }

    function makeNewEvent(name){ 

        let ev = new Event(name);
        setNewEvent(ev);
        console.log("new event = ", ev);
        setNextID(ev.id); 

    }

    function amendList(action, list, item, itemndx){
        let dbList;
        switch (list) {
            case MissionList:
                dbList = "Missions"
            break;
            case InboxItems:
                dbList = "Inbox"
            break;
            case References:
                dbList = "References"
            break;
            case Events:
                dbList = "Events"
            break;
            case TaskList:
                dbList = "Tasks"
            break;
            default:
        }
        switch (action) {
            case REMOVE:
                //list.splice(itemndx, 1);
                //pushChanges(REMOVE, item, dbList, shipItems);
            break;
            case ADD:
                list.unshift(item);
                //pushChanges(ADD, item, dbList, shipItems);
            break;
            default:
        }

    }

    function updateStatus() {
        item.status = PROCESSED;
        item.processedDate = new Date().toISOString().substr(0, 10);
        pushChanges(UPDATE, item, "Inbox", shipItems);
    }
    
    function processNextItem(e){
        setStep(0);
        //touchFunction(e);
        let nav = { 
            title: INBOX,
            view: DETAILS,
            ID: nextItemID
        }

        changeNav(nav);
    }

    function proceed() {
        setStep((step+1));
    }

    function refresh(){
        changeItemID(item.id);
    }

    
    if (item.status === UNPROCESSED && step === 0){
        proceed();
    }

    let nav;
    if (isMultistep){
        nav = {
            title: MISSIONS,
            view: DETAILS,
            ID: newMission.id
        }
    } else if(isMultistep === false && step >4){
        nav = {
            title: TASKS,
            view: DETAILS,
            ID: newTask.id
        }
    }

    function viewNewReference(id) {
        nav = {
            title: REFERENCES,
            view: DETAILS,
            ID: id
        }
        changeNav(nav);
    }

    function viewNewEvent(id) {
        nav = {
            title: EVENTS,
            view: DETAILS,
            ID: id
        }

        changeNav(nav);
    }

    function saveDate(date){
        //updateDB( mission, "dueDate", date )

    }

    switch(true) {
        case ( step === 1 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Is this Actionable?' 
                    yes={() => { setIsActionable(true); proceed() }} 
                    no={() => { setIsActionable(false); proceed() }} />
                </div>
            )
        case ( isActionable === false && step === 2 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <button className="button" id={nextItemID} onClick={() => { setReferenced(true); makeNewReference(item.name); proceed() }} >ADD TO REFERENCES</button>
                    <button className="button" id={nextItemID} onClick={() => { setIncubated(true); makeNewEvent(item.name); proceed() }} >ADD TO EVENTS</button>
                    {/* <button className="button" id={nextItemID} onClick={() => { setTrashed(true); trashItem(); proceed() }} >TRASH</button> */}
                </div>
            )
        case ( trashed === true && step === 3 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>Item has been trashed</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                </div>
            )
        case ( isActionable === false && step === 3 && referenced === true ):
            //
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column'>
                    <h2 className='white tc pb2'>Any details to add?</h2>
                    <form onSubmit={(e) => { 
                        newReference.details = refDetails; 
                        console.log(newReference); 
                        pushChanges(UPDATE, newReference, "References", shipItems);
                        updateStatus(); 
                        e.preventDefault(); 
                        proceed() 
                    }}>
                        <textarea rows="4" cols="45" autoFocus value={refDetails} onChange={(e)=> setRefDetails(e.target.value)} />
                        <input type='submit' value='submit' />
                    </form>
                </div>
            )
        case ( isActionable === false && step === 3 && incubated === true ):
            function saveEventDate(date){
                newEvent.date = date;
            }
        
        return (
            <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column'>
                <h2 className='white tc pb2'>Date of Event?</h2>
                <DatePicker item={newEvent} dueDate={newEvent.date} updateFunc={saveEventDate}/>
                <div>
                    <button className="button" onClick={() => { 
                        pushChanges(ADD, newEvent, "Events", shipItems);
                        amendList(ADD, Events, newEvent, 0); 
                        updateStatus(); 
                        proceed(); 
                    }} >CONTINUE</button>
                </div>
                
            </div>
        )
        case ( isActionable === false && step === 4 ):
            if (referenced === true ) {}
            if (incubated === true ) {;}
            // Added to references
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>Item has been processed</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => {
                        referenced === true ? viewNewReference(nextID) : viewNewEvent(nextID)
                    }} >VIEW ITEM</button>
                </div>
            )
        case ( isActionable === true && step === 2 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What's the desired outcome?" submitFunction={(answer) => { setOutcome(answer); proceed() }} />
                </div>
            )
        case ( step === 3 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can the outcome be reached with just one task?' 
                    yes={() => { setIsMultistep(false); proceed(); } } 
                    no={() => { setIsMultistep(true); proceed();  makeNewMission(); }} />
                </div>
            )
            
        case ( isMultistep === false && step === 4 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What's the task?" 
                    submitFunction={(answer) => {
                        makeNewTask(answer);
                        proceed(); 
                    }} />
                </div>
            )
        case ( isMultistep === true && step === 4 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What's the first task?" 
                    submitFunction={(answer) => { 
                        makeNewTask(answer); 
                        proceed(); 
                        }} />
                </div>
            )
        case ( isMultistep === true && step === 5 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can the desired outcome be reached within the next 12 months?' 
                    yes={() => { 
                        setIsDoneInaYear(true); 
                        newMission.taskList.unshift(newTask.id);
                        pushChanges(ADD, newMission, "Missions", shipItems);
                        amendList(ADD, MissionList, newMission, 0); proceed() 
                    }} 
                    no={() => { 
                        newMission.taskList.unshift(newTask.id); 
                        amendList(ADD, SomedayList, newMission, 0);
                        setIsDoneInaYear(false); 
                        updateStatus(); 
                        proceed();
                    }} />
                </div>
            )
        case ( isMultistep === false && step === 5 ):
            // console.log("step 5. new task: ", newTask);
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can the desired outcome be reached within the next 12 months?' 
                    yes={() => { setIsDoneInaYear(true); proceed() }} 
                    no={() => { amendList(ADD, SomedayList, newTask, 0); setIsDoneInaYear(false); updateStatus(); proceed() }} />
                </div>
            )
        case ( isMultistep === true && step === 6 && isDoneInaYear === true ):
            // New mission was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Mission has been added</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => changeNav(nav)} >VIEW MISSION</button>
                </div>
            )
        case ( isMultistep === true && step === 6 && isDoneInaYear === false ):
            // New mission was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Mission has been added to the Someday List</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW MISSION</button> */}
                </div>
            )
        case ( isMultistep === false && step === 6 && isDoneInaYear === false ):
            // New mission was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Task has been added to the Someday List</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW MISSION</button> */}
                </div>
            )
        case ( isMultistep === false && step === 6 && isDoneInaYear === true ):
            console.log("step 5. new task: ", newTask);
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can it be done now in 5 minutes or less?' 
                    yes={() => { setIsDoneInFive(true); pushChanges(ADD, newTask, "Tasks", shipItems); amendList(ADD, TaskList, newTask, 0); proceed() }} 
                    no={() => { setIsDoneInFive(false); proceed() }} />
                </div>
            )
        case (isDoneInFive === true && step === 7):
            console.log("new tasklKST:", TaskList)
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h2 className='fw8 b white pb2'>LET'S DO IT!</h2>
                    <div className='w-100 pa2 pb3' >
                        <h3 className='fw7 b white pb2'>{newTask.name}</h3>
                    </div>
                    <button className="button" onClick={() => { updateStatus();  changeNav(nav) }} >GO TO TASK </button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeNav(nav)} >VIEW TASK</button> */}
                </div>
            )
        case ( isDoneInFive === false && step === 7 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can this task be delegated?' 
                    yes={() => { setIsDelegatable(true); proceed(); }} 
                    no={() => { setIsDelegatable(false); proceed(); }} />
                </div>
            )
        case ( isDelegatable === true && step === 8 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="Who would you like to assign this task to?" 
                    submitFunction={(answer) => { setAssignedAgent(answer); newTask.agent = assignedAgent; proceed() }} />
                </div>
            )
        case ( isDelegatable === false && step === 8 ):
            function saveTaskDate(date){
                //updateDB( mission, "dueDate", date )
                newTask.dueDate = date;
            }
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h2 className='fw4 white'>By when should this task to be done</h2>
                    <DatePicker item={newTask} dueDate={newTask.dueDate} updateFunc={saveTaskDate} />
                    <div>
                        {/* <button className="button" onClick={() => { setDueDate("ASAP"); console.log(newTask); proceed(); }}>ASAP</button> */}
                        <button className="button" onClick={() => { setDueDate(newTask.dueDate); console.log(newTask); proceed(); }} >CONTINUE</button>
                    </div>
                </div>
            )
        case ( isDelegatable === false && step === 9 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="Where should this task be done?" 
                    submitFunction={(answer) => { 
                        setRequiredContext(answer); 
                        newTask.requiredContext = answer;
                        pushChanges(ADD, newTask, "Tasks", shipItems)
                        amendList(ADD, TaskList, newTask, 0);
                        
                        proceed(); }} />
                </div>
            )
        case ( step === 10 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show flex items-center flex-column' >
                    <h3 className='white tc pb2'>A new Task has been added</h3>
                    <button className="button" id={nextItemID} onClick={ processNextItem } >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => changeNav(nav)} >VIEW TASK</button>
                </div>
            )
        default:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Processor);