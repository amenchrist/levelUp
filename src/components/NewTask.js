import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PENDING, LOW, TASK, MEDIUM, HIGH, MISSIONS, ADD, DAILY, NONE, SOMEDAY } from '../constants';
import { selectView, selectItem, ShipItems, ChangeNav, } from '../actions';
import { Task } from '../classes';
import { pushChanges } from '../functions';
import DatePicker from './DatePicker';


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
    const [ details, setDetails ] = useState('');
    const [ dueDate, setDueDate ] = useState(SOMEDAY);
    const [ agent, setAgent ] = useState('');
    const [ priority, setPriority ] = useState('');
    const [ frequency, setFrequency ] = useState('NONE');
    const [ requirements, setRequirements ] = useState('');
    const [ associatedMissionID, setAssociatedMissionID ] = useState(itemID);

    function submitNewItem(event) {
        let t = new Task(name, outcome, requiredContext, associatedMissionID, dueDate);
        console.log(t);
        t.frequency = frequency;
        t.details = details;
        updateExp(5);
        TaskList.unshift(t);
        pushChanges(ADD, t, "Tasks", shipItems);
        if(title === MISSIONS){
           addToMissionTasks(t, associatedMissionID);
        }
        //changeItemID(t.id);
        changeNavigation(t.id)
        event.preventDefault();
    }

    function changeNavigation(id){
        let nav;
        if(title === MISSIONS) {
            nav = {
                title: MISSIONS,
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

    function addToMissionTasks(task, projID){
        let id = parseInt(projID);
        let content = db.Missions;
        let proj;
        for (let i=0; i<content.length; i++){
            console.log(content[i].id)
            if (content[i].id === id){
                console.log(content[i].id)

                proj = content[i];
                proj.taskList.unshift(task.id);

                pushChanges("UPDATE", proj, "Missions", shipItems);
            }
        }

        
    }

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc b gold f3'>NEW TASK</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={TASK}>
                <input className='pa2 mb1' type='text' autoFocus placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
                <input  className='pa2 mb1'type='text' placeholder='Outcome' value={outcome} onChange={(e) => setOutcome(e.target.value)} />
                <textarea  className='pa2 mb1' placeholder='Details' value={details} onChange={(e) => setDetails(e.target.value)} />
                <textarea  className='pa2 mb1' placeholder='Required Context' value={requiredContext} onChange={(e) => setRequiredContext(e.target.value)} />
                {/* <label className='fw4 white' htmlFor="due date" >Due Date:</label> */}
                <DatePicker item={{}} dueDate={dueDate} updateFunc={setDueDate} />
                {/* <input className='pa2 mb1' id='due date' type='date' min={today} value={dueDate} onChange={(e) => setDueDate(e.target.value)} /> */}
                <select className='pa2 mb1' id="priority" value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
                    <option value="" disabled defaultValue>Frequency</option>
                    <option value={NONE}>ONE-TIME</option>
                    <option value={DAILY}>DAILY</option>
                </select>
                <textarea className='pa2 mb1' placeholder='Requirements' value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                <input className='pa2 mb1' type='text' placeholder='Assigned Agent' value={agent} onChange={(e)=> setAgent(e.target.value)} />
                {/* <input type='text' placeholder='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <input type='text' placeholder='Associated Mission name' value={associatedMission} onChange={(e) => setAssociatedMission(e.target.value)} /> */}
                <input className='pa2 mb1' type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);