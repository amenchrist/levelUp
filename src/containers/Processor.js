import React, { useState } from 'react';
import QuestionAndOptions from '../components/QuestionAndOptions';
import QuestionandInput from '../components/QuestionAndInput';
import { Task, Project } from '../classes';
import { ReferenceList } from '../ReferenceList';
import {  PROCESSED, TASK, PENDING, UNPROCESSED, REFERENCE, ADD, UPDATE, REMOVE, REFERENCES, SOMEDAY, PROJECTS, TASKS } from '../constants';
import { selectView, selectItem, ChangeNav, ShipItems } from '../actions';
import { connect } from 'react-redux';
import DatePicker from '../components/DatePicker';
import { pushChanges  } from '../functions';


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
    const ProjectList = db.Projects;
    const TaskList = db.Tasks;
    const ProcessedItems = db.Processed;

    

    const [ outcome, setOutcome ] = useState('');
    const [ requiredContext, setRequiredContext ] = useState('');
    const [ isActionable, setIsActionable ] = useState(null);
    const [ taskName, setTaskName ] = useState('');
    const [ isMultistep, setIsMultistep ] = useState(null);
    const [ isDoneInFive, setIsDoneInFive ] = useState(null);
    const [ isDelegatable, setIsDelegatable ] = useState(null);
    const [ step, setStep ] = useState(0);
    const [ nextID, setNextID ] = useState(0);
    const [ isDoneInaYear, setIsDoneInaYear ] = useState(null);
    const [ newProjectID, setNewProjectID ] = useState(0);
    const [ newTaskID, setNewTaskID ] = useState(0);
    const [ newProject, setNewProject ] = useState(null);
    const [ newTask, setNewTask ] = useState(null);
    const [ assignedAgent, setAssignedAgent ] = useState(null);
    const [ dueDate, setDueDate ] = useState(null);

    // function pushChanges(action, item, list){
    //     let state = {
    //         action: action,
    //         list: list,
    //         item: item,
    //         pushDate: (new Date()).getTime()
    //     }
    //     shipItems(state);
    // }

    function processNextItem(e){
        setStep(0);
        //touchFunction(e);
    }

    function makeNewProject(){
        let proj = new Project( outcome );
        setNewProject(proj);
        setNewProjectID(proj.id);
        //ProjectList.unshift(proj);
        // pushChanges(ADD, proj, "Projects");
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
            asProjID = newProjectID;
        }

        let task = new Task(name, theOutcome, requiredContext, asProjID);
        setNewTask(task);
        console.log("new task = ",task);
        updateStatus();
        setNextID(task.id);  

        //ADD TASK TO TASK LIST AND 
        //TaskList.unshift(task);
        //pushChanges(ADD, task, "Tasks", shipItems);

        // InboxItems.splice(itemIndex,1);
        // pushChanges(REMOVE, item, "Inbox");
        setNewTaskID(task.id);  
    }

    function ammendList(action, list, item, itemndx){
        let dbList;
        switch (list) {
            case ProjectList:
                dbList = "Projects"
            break;
            case InboxItems:
                dbList = "Inbox"
            break;
            case REFERENCES:
                dbList = "References"
            break;
            case TaskList:
                dbList = "Tasks"
            break;
            case SOMEDAY:
                dbList = "Someday"
            break;
            default:
        }
        switch (action) {
            case REMOVE:
                list.splice(itemndx, 1);
                pushChanges(REMOVE, item, dbList, shipItems);
            break;
            case ADD:
                list.unshift(item);
                pushChanges(ADD, item, dbList, shipItems);
            break;
            default:
        }

    }

    function updateStatus() {
        item.status = PROCESSED;
        ProcessedItems.unshift(item);
        InboxItems.splice(itemIndex,1);
        pushChanges(UPDATE, item, "Inbox", shipItems);
        pushChanges(ADD, item, "Processed", shipItems);
        pushChanges(REMOVE, item, "Inbox", shipItems);
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

    function addToReferences(){
        item.type = REFERENCE;
        updateStatus();
        InboxItems.splice(itemIndex,1);
        ReferenceList.unshift(item);
        pushChanges(ADD, item, "References", shipItems);
    }

    function addToSomedayList(){
        InboxItems.splice(itemIndex,1);
        ReferenceList.unshift(item);
        pushChanges(ADD, item, "References", shipItems);
    }

    let nav;
    if (isMultistep){
        nav = {
            title: PROJECTS,
            view: "DETAILS",
            ID: newProject.id
        }
    } else if(isMultistep === false && step >4){
        nav = {
            title: TASKS,
            view: "DETAILS",
            ID: newTask.id
        }
    }

    switch(true) {
        case ( step === 1 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Is this Actionable?' 
                    yes={() => { setIsActionable(true); proceed() }} 
                    no={() => { setIsActionable(false); addToReferences(); updateStatus(); proceed() }} />
                </div>
            )
        case ( isActionable === false && step === 2 ):
        // Added to references
        return (
            <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                <h3 className='white tc pb2'>Item was added to References</h3>
                <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                <button className="button" id={nextItemID} onClick={() => changeItemID(item.id)} >VIEW ITEM</button>
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
                    no={() => { setIsMultistep(true); proceed();  makeNewProject(); }} />
                </div>
            )
            
        case ( isMultistep === false && step === 4 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What's the task?" 
                    submitFunction={(answer) => {
                        setTaskName(answer);
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
                        setTaskName(answer);
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
                        TaskList.unshift(newTask);
                        newProject.taskList.unshift(newTask.id); 
                        ammendList(ADD, ProjectList, newProject, 0); proceed() 
                    }} 
                    no={() => { 
                        setIsDoneInaYear(false); 
                        newProject.taskList.unshift(newTask.id); 
                        TaskList.unshift(newTask);
                        addToSomedayList(newProject);
                        updateStatus(); 
                        proceed() 
                    }} />
                </div>
            )
        case ( isMultistep === false && step === 5 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can the desired outcome be reached within the next 12 months?' 
                    yes={() => { setIsDoneInaYear(true); proceed() }} 
                    no={() => { setIsDoneInaYear(false); addToSomedayList(newTask); updateStatus(); proceed() }} />
                </div>
            )
        case ( isMultistep === true && step === 6 && isDoneInaYear === true ):
            // New project was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Mission has been added</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => changeNav(nav)} >VIEW MISSION</button>
                </div>
            )
        case ( isMultistep === true && step === 6 && isDoneInaYear === false ):
            // New project was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Mission has been added to the Someday List</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW PROJECT</button> */}
                </div>
            )
        case ( isMultistep === false && step === 6 && isDoneInaYear === false ):
            // New project was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Task has been added to the Someday List</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    {/* <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW PROJECT</button> */}
                </div>
            )
        case ( isMultistep === false && step === 6 && isDoneInaYear === true ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can it be done now in 5 minutes or less?' 
                    yes={() => { setIsDoneInFive(true); proceed() }} 
                    no={() => { setIsDoneInFive(false); proceed() }} />
                </div>
            )
        case (isDoneInFive === true && step === 7):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h3>LET'S DO IT!</h3>
                    <h2>TIMER</h2>
                    <p>Once timer is done, you get the option to mark as completed. You also get the option ot defer the action.</p>
                    <button className="button" onClick={() => { updateStatus(); setStep(0); refresh() }} >DONE</button>
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
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h2 className='fw4 white'>By when should this task to be done</h2>
                    <DatePicker item={newTask} dueDate={newTask.dueDate} />
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
                        ammendList(ADD, TaskList, newTask, 0)
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