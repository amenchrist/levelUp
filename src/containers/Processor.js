import React, { useState } from 'react';
import QuestionAndOptions from '../components/QuestionAndOptions';
import QuestionandInput from '../components/QuestionAndInput';
//import InboxItems  from '../InboxItems';
//import { ProjectList } from '../ProjectList';
//import { TaskList } from '../TaskList';
import { ReferenceList } from '../ReferenceList';
import { PROJECT, UNPLANNED, PROCESSED, TASK, PENDING, UNPROCESSED, REFERENCE } from '../constants';
import { selectView, selectItem } from '../actions';
import { connect } from 'react-redux';
import { ShipItems } from '../actions';

//shipItems(items, agent, record)
//

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        itemID: state.selectItemReducer.itemID,
        db: state.items.record.items //state.RetrieveDBReducer.db
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
        }
    }
}

function Processor({ nextItemID, item, touchFunction, changeItemID, itemIndex, db, shipItems }) {

    const InboxItems = db.Inbox;
    const ProjectList = db.Projects;
    const TaskList = db.Tasks;

    class Task{
        constructor(name,outcome, isDelegatable, requiredContext) {
            const d = new Date();
            this.type = TASK;
            this.id = d.getTime();
            this.entryDate = d.getTime();
            this.status = PENDING;
            this.priority = 'NONE';
            this.frequency = 0;
            this.timeSpent = 0;
            this.outcomeRecordID = 0;
            this.name = name;
            this.outcome = outcome;
            this.requiredContext = requiredContext;
            this.note = '';
            this.dueDate = (new Date()).toISOString().substr(0, 10);
            this.timeRequired = 0;
            this.requirements = '';
            this.associatedProject = {};
            this.exp = 10;
            this.isDelegatable = isDelegatable;
            this.description = '';
            
        }
    }


    class Project{
        constructor(name, goal) {
            const d = new Date();
            this.type = PROJECT;        
            this.id = d.getTime();
            this.name = name;
            this.description = '';
            this.goal = goal;
            this.outcome = outcome;
            this.outputRecordID = null;
            this.dueDate = (new Date((d.getTime() + 7776000000))).toISOString().substr(0, 10); // 3 months from the date the project is planned 
            this.timeRequired = 7776000000;
            this.timeRemaining = setInterval(()=> {
                let timeNow = (new Date()).getTime();
                return (this.dueDate - timeNow)
            }, 1);
            this.status = UNPLANNED;
            this.nextAction = {};
            this.taskList = [];
        }
    }

    const [ outcome, setOutcome ] = useState('');
    const [ requiredContext, setRequiredContext ] = useState('');
    const [ isActionable, setIsActionable ] = useState(null);
    const [ action, setAction ] = useState('');
    const [ isMultistep, setIsMultistep ] = useState(null);
    const [ isDoneInFive, setIsDoneInFive ] = useState(null);
    const [ isDelegatable, setIsDelegatable ] = useState(null);
    const [ step, setStep ] = useState(0);
    const [ nextID, setNextID ] = useState(0);

    function processNextItem(e){
        setStep(0);
        //touchFunction(e);
    }

    function makeNewProject(){
        let proj = new Project( action, outcome );
        ProjectList.unshift(proj);
        shipItems();
        updateStatus();
        InboxItems.splice(itemIndex,1);
        setNextID(proj.id);
    }

    function makeNewTask(){
        let task = new Task( action, outcome, isDelegatable, requiredContext);
        TaskList.unshift(task);
        console.log("new task = ",task);
        //updateStatus();
        InboxItems.splice(itemIndex,1);
        setNextID(task.id);
        
    }

    function updateStatus() {
        item.status = PROCESSED;
        shipItems(item);
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
    }

    switch(true) {
        case ( step === 1 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Is this Actionable?' yes={() => { setIsActionable(true); proceed() }} no={() => { setIsActionable(false); addToReferences(); updateStatus(); proceed() }} />
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
                    <QuestionandInput question="What's the next action?" submitFunction={(answer) => { setAction(answer); proceed() }} />
                </div>
            )
        case ( step === 4 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Does the action require more than one step?' yes={() => { setIsMultistep(true); proceed();  makeNewProject() } } no={() => { setIsMultistep(false); proceed();} } />
                </div>
            )
        case ( isMultistep === true && step === 5 ):
            // New project was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column show ' >
                    <h3 className='white tc pb2'>A new Project has been added</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW PROJECT</button>
                </div>
            )
        case ( isMultistep === false && step === 5 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can it be done now in 5 minutes or less?' yes={() => { setIsDoneInFive(true); proceed() }} no={() => { setIsDoneInFive(false); proceed() }} />
                </div>
            )
        case (isDoneInFive === true && step === 6):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h3>LET'S DO IT!</h3>
                    <h2>TIMER</h2>
                    <p>Once timer is done, you get the option to mark as completed. You also get the option ot defer the action.</p>
                    <button className="button" onClick={() => { updateStatus(); setStep(0); refresh() }} >DONE</button>
                </div>
            )
        case ( isDoneInFive === false && step === 6 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="Where should this task be done?" submitFunction={(answer) => { setRequiredContext(answer); proceed(); }} />
                </div>
            )
            
        case ( step === 7 ): 
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Can this task be delegated?' yes={() => { setIsDelegatable(true); makeNewTask(); proceed(); }} no={() => { setIsDelegatable(false); makeNewTask(); proceed(); }} />
                </div>
            )
        case ( step === 8 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show flex items-center flex-column' >
                    <h3 className='white tc pb2'>A new Task has been added</h3>
                    <button className="button" id={nextItemID} onClick={ processNextItem } >PROCESS NEXT ITEM</button>
                    <button className="button" id={nextItemID} onClick={() => changeItemID(nextID)} >VIEW TASK</button>
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