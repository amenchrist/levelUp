import React, { useState } from 'react';
import { PENDING, LOW, TASK, MEDIUM, HIGH } from '../constants';
import { TaskList } from '../TaskList';
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

function NewTask({ changeItemID, updateExp }) {

    let today = new Date().toISOString().substr(0, 10);

    const [ name, setName ] = useState('');
    const [ outcome, setOutcome ] = useState('');
    const [ requiredContext, setRequiredContext ] = useState('');
    const [ note, setNote ] = useState('');
    const [ dueDate, setDueDate ] = useState(today);
    const [ priority, setPriority ] = useState('');
    const [ frequency, setFrequency ] = useState(0);
    const [ requirements, setRequirements ] = useState('');
    const [ associatedProject, setAssociatedProject ] = useState({});

    class Task{
        constructor() {
            const d= new Date();

            setFrequency(0);
            setAssociatedProject({});

            this.type = TASK;
            this.id = d.getTime();
            this.entryDate = d.getTime();
            this.status = PENDING;
            this.priority = priority;
            this.frequency = frequency;
            this.timeSpent = 0;
            this.outcomeRecordID = 0;
            this.name = name;
            this.outcome = outcome;
            this.requiredContext = requiredContext;
            this.note = note;
            this.dueDate = dueDate;
            this.timeRequired = 0;
            this.requirements = requirements;
            this.associatedProject = associatedProject;
            this.exp = 10;
        }
    }

    function submitNewItem(event) {
        let t = new Task();
        console.log(t);
        TaskList.unshift(t);
        updateExp(5);
        changeItemID(t.id);
        event.preventDefault();
    }

    

    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10 '>
            <h1 className='tc'>NEW TASK</h1>
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
                {/* <input type='text' placeholder='Frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <input type='text' placeholder='Associated project name' value={associatedProject} onChange={(e) => setAssociatedProject(e.target.value)} /> */}
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);