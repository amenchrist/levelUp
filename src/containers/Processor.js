import React, { useState } from 'react';
import QuestionAndOptions from '../components/QuestionAndOptions';
import QuestionandInput from '../components/QuestionAndInput';
import { ProjectList } from '../ProjectList';
import { TaskList } from '../TaskList';
import { PROJECT, UNPLANNED, PROCESSED, TASK, PENDING, UNPROCESSED } from '../constants';
import { selectView, selectItem } from '../actions';
import { connect } from 'react-redux';

class Project{
    constructor(name, goal) {
        const d = new Date();
        this.type = PROJECT;        
        this.id = d.getTime();
        this.name = name;
        this.description = '';
        this.goal = goal;
        this.output = null;
        this.outputRecordID = null;
        this.dueDate = (d.getTime() + 7776000000); // 3 months from the date the project is planned 
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

class Task{
    constructor(name,output, isDelegatable) {
        const d = new Date();
        this.type = TASK;        
        this.id = d.getTime();
        this.name = name;
        this.description = '';
        this.output = output;
        this.outputRecordID = 0;
        this.timeRequired = null; 
        this.status = PENDING;
        this.isDelegatable = isDelegatable;
        this.associatedProject = {};
        this.dueDate = null;
    }
}

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        itemID: state.selectItemReducer.itemID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

function Processor({ nextItemID, item, touchFunction, changeItemID }) {
    //actionable?
    //action
    //multistep?
    //done in 5?
    //delegatable?
    //project outcome


    const [ outcome, setOutcome ] = useState('');
    const [ isActionable, setIsActionable ] = useState(null);
    const [ action, setAction ] = useState('');
    const [ isMultistep, setIsMultistep ] = useState(null);
    const [ isDoneInFive, setIsDoneInFive ] = useState(null);
    const [ isDelegatable, setIsDelegatable ] = useState(null);
    const [ step, setStep ] = useState(0);

    function processNextItem(e){
        setStep(0);
        touchFunction(e);
    }

    function makeNewProject(){
        let proj = new Project( action, outcome );
        ProjectList.unshift(proj);
        updateStatus();
        refresh();
    }

    function makeNewTask(){
        let task = new Task( action, outcome, isDelegatable);
        TaskList.unshift(task);
        updateStatus();
    }
    function updateStatus() {
        item.status = PROCESSED;
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

    switch(true) {
        case ( step === 1 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Is this Actionable?' yes={() => { setIsActionable(true); proceed() }} />
                </div>
            )
        case ( isActionable === true && step === 2 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionandInput question="What does 'DONE' look like?" submitFunction={(answer) => { setOutcome(answer); proceed() }} />
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
                    <QuestionAndOptions question='Does the next action require more than one step?' yes={() => { setIsMultistep(true); proceed();  makeNewProject() } } no={() => { setIsMultistep(false); proceed();} } />
                </div>
            )
        case ( isMultistep === true && step === 5 ):
            // New project was added and page refreshed
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h3>A new Project has been added</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
                </div>
            )
        case ( isMultistep === false && step === 5 ):
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <QuestionAndOptions question='Would it take more than 5 minutes to do?' yes={() => { setIsDoneInFive(false); proceed() }} no={() => { setIsDoneInFive(true); proceed() }} />
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
                    <QuestionAndOptions question='Can this task be delegated?' yes={() => { setIsDelegatable(true); updateStatus(); refresh(); proceed(); }} no={() => { setIsDelegatable(false); updateStatus(); refresh(); proceed(); }} />
                </div>
            )
        case ( step === 7 ):
            makeNewTask();
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10 show ' >
                    <h3>A new Task has been added</h3>
                    <button className="button" id={nextItemID} onClick={processNextItem} >PROCESS NEXT ITEM</button>
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