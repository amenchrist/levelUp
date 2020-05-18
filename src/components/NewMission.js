import React, { useState } from 'react';
import { PENDING, LOW, MEDIUM, HIGH, MISSION, PROJECT } from '../constants';
import { ProjectList } from '../ProjectList';
import { selectView, selectItem } from '../actions';
import { connect } from 'react-redux';

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

function NewMission({ changeItemID, updateExp }) {

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState('');
    const [ purpose, setPurpose ] = useState('');
    const [ outcome, setOutcome ] = useState('');
    const [ note, setNote ] = useState('');
    const [ dueDate, setDueDate ] = useState(today);
    const [ priority, setPriority ] = useState('');
    const [ frequency, setFrequency ] = useState(0);
    const [ requirements, setRequirements ] = useState('');
    //const [ taskList, setTaskList ] = useState([]);


    class Mission{
        constructor() {
            const d= new Date();

            this.type = PROJECT;
            this.id = d.getTime();
            this.entryDate = d.getTime();
            this.status = PENDING;
            this.priority = priority;
            this.frequency = frequency;
            this.timeSpent = 0;
            this.outcomeRecordID = 0;
            this.name = name;
            this.purpose = purpose;
            this.outcome = outcome;
            this.principles = '';
            this.note = note;
            this.dueDate = dueDate;
            this.timeRequired = 0;
            this.requirements = requirements;
            this.taskList = [];
            this.exp = 50;
        }
    }

    function submitNewItem(event) {
        
        let m = new Mission();
        console.log(m);
        // console.log(m.id);
        ProjectList.unshift(m);
        updateExp(5);
        changeItemID(m.id);
        event.preventDefault();
        setFrequency(0);
    }

    
    

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc'>New Mission</h1>
            <form onSubmit={submitNewItem} className='flex flex-column' title={MISSION}>
                <input type='text' placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
                <input type='text' placeholder='Outcome' value={outcome} onChange={(e) => setOutcome(e.target.value)} />
                <textarea placeholder='What is the purpose of the mission?' value={purpose} onChange={(e) => setPurpose(e.target.value)} />
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
                {/* <input type='text' placeholder='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <input type='text' placeholder='Associated project name' value={associatedProject} onChange={(e) => setAssociatedProject(e.target.value)} /> */}
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMission);