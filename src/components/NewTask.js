import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PENDING, LOW, TASK, MEDIUM, HIGH, PROJECTS } from '../constants';
import { selectView, selectItem, ShipItems, ChangeNav } from '../actions';
import { Task, Project } from '../classes';


const mapStateToProps = state => {
    return {
        view: state.values.view,
        itemID: state.values.itemID,
        db: state.items.record.items,
        title: state.values.title,
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

function NewTask({ changeItemID, updateExp, shipItems, itemID, db, changeNav, title }) {

    const TaskList = db.Tasks;

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState('');
    const [ outcome, setOutcome ] = useState('');
    const [ requiredContext, setRequiredContext ] = useState('');
    const [ note, setNote ] = useState('');
    const [ dueDate, setDueDate ] = useState((new Date()).toISOString().substr(0, 10));
    const [ agent, setAgent ] = useState('');
    const [ priority, setPriority ] = useState('');
    const [ frequency, setFrequency ] = useState(0);
    const [ requirements, setRequirements ] = useState('');
    const [ associatedProjectID, setAssociatedProjectID ] = useState(itemID);

    // class Task{
    //     constructor() {
    //         const d= new Date();

    //         setFrequency(0);
    //         setAssociatedProject({});

    //         this.type = TASK;
    //         this.id = d.getTime();
    //         this.entryDate = d.getTime();
    //         this.status = PENDING;
    //         this.priority = priority;
    //         this.frequency = frequency;
    //         this.timeSpent = 0;
    //         this.outcomeRecordID = 0;
    //         this.name = name;
    //         this.outcome = outcome;
    //         this.requiredContext = requiredContext;
    //         this.note = note;
    //         this.dueDate = dueDate;
    //         this.timeRequired = 0;
    //         this.requirements = requirements;
    //         this.associatedProject = associatedProject;
    //         this.exp = 10;
    //     }
    // }

    function pushChanges(action, item, list){
        let state = {
            action: action,
            list: list,
            item: item,
            pushDate: (new Date()).getTime()
        }
        shipItems(state);
    }

    function submitNewItem(event) {
        let t = new Task(name, outcome, requiredContext, associatedProjectID, dueDate);
        console.log(t);
        updateExp(5);
        TaskList.unshift(t);
        pushChanges("ADD", t, "Tasks");
        if(title === PROJECTS){
           addToProjectTasks(t, associatedProjectID);
        }
        //changeItemID(t.id);
        changeNavigation(t.id)
        event.preventDefault();
    }

    function changeNavigation(id){
        let nav;
        if(title === PROJECTS) {
            nav = {
                title: PROJECTS,
                view: "DETAILS",
                ID: itemID
            }
        } else {
            nav = {
                title: title,
                view: "DETAILS",
                ID: id
            }
        }
        changeNav(nav);
    }

    function addToProjectTasks(task, projID){
        let id = parseInt(projID);
        let content = db.Projects;
        let proj;
        for (let i=0; i<content.length; i++){
            console.log(content[i].id)
            if (content[i].id === id){
                console.log(content[i].id)

                proj = content[i];
                proj.taskList.unshift(task.id);

                pushChanges("UPDATE", proj, "Projects");
            }
        }

        
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW TASK</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={TASK}>
                <input type='text' placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
                <input type='text' placeholder='Outcome' value={outcome} onChange={(e) => setOutcome(e.target.value)} />
                <textarea placeholder='Required Context' value={requiredContext} onChange={(e) => setRequiredContext(e.target.value)} />
                <textarea placeholder='Note' value={note} onChange={(e) => setNote(e.target.value)} />
                <label htmlFor="due date" className=''>Due Date:</label>
                <input id='due date' type='date' min={today} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <select id="priority" value={priority} onChange={(e)=> setPriority(e.target.value)}>
                    <option value="" disabled defaultValue>Priority</option>
                    <option value={LOW}>Low</option>
                    <option value={MEDIUM}>Medium</option>
                    <option value={HIGH}>High</option>
                </select>
                <textarea placeholder='Requirements' value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                <input type='text' placeholder='Assigned Agent' value={agent} onChange={(e)=> setAgent(e.target.value)} />
                {/* <input type='text' placeholder='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <input type='text' placeholder='Associated project name' value={associatedProject} onChange={(e) => setAssociatedProject(e.target.value)} /> */}
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);