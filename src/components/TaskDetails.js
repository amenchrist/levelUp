import React, { useState, useEffect } from 'react';
import { TaskList } from '../TaskList';
import { DONE } from '../constants';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp } from '../actions';
import DatePicker from './DatePicker';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        previousView: state.selectViewReducer.previousView,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp
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
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);


function TaskDetails({ id , changeItemID, updateExp }) {

    const db = TaskList;
    let task = {};
    let position;

    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
           task = db[i];
           position = i;
           break;
        }
    }

    function startTimer(){
        //
    }

    function markAsDone(){
        task.status = DONE;
        TaskList.splice(position,1);
        updateExp(task.exp);
        changeItemID(0);
    }

    const [ name, setName ] = useState(task.name);
    const [ requiredContext, setrequiredContext ] = useState(task.requiredContext);
    const [ outcome, setoutcome ] = useState(task.outcome);
    const [ dueDate, setdueDate ] = useState(task.dueDate);
    const [ timeRequired, settimeRequired ] = useState(task.timeRequired);
    const [ note, setnote ] = useState(task.note);

    useEffect(() => {
        setName(task.name);
        setrequiredContext(task.requiredContext);
        setoutcome(task.outcome);
        setnote(task.note);
        setdueDate(task.dueDate);
    }, [task.name, task.requiredContext, task.outcome, task.note, task.dueDate])

    

    return (
        <div className='' >
            <div>
                <div className='w-100 pa2 pb3' >
                    {/* <h3 className='fw7 b white pb2'>{task.name}</h3>
                    <h4 className='fw1 white'>{task.requiredContext}</h4> */}
                    <input type='text' onChange={(e)=> {setName(e.target.value);} } onBlur={() =>task.name=name} value={name} className='bn fw7 b white bg-transparent' />
                    <input type='text' onChange={(e)=> {setrequiredContext(e.target.value);} } onBlur={() =>task.requiredContext=requiredContext} value={requiredContext} className='fw1 white bn bg-transparent' />
                </div>
                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Outcome: </h5>
                    {/* <h5 className='fw3 white'>{task.outcome} </h5> */}
                    <textarea rows="2" cols="45" onChange={(e)=> {setoutcome(e.target.value);} } onBlur={() =>task.outcome=outcome} value={outcome} className='w-80 fw3 white bn bg-transparent' />
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>
                    {/* <h5 className='fw3 white'>Due: {task.dueDate} </h5> */}
                    <h5 className='fw3 white'>Time Required: {task.timeRequired}</h5>
                    <DatePicker item={task} dueDate={dueDate} />
                    {/* <input type='date' defaultValue={dueDate} onChange={(e)=> {setdueDate(e.target.value);} } onBlur={() =>task.dueDate=dueDate} className='fw3 white bn bg-transparent' /> */}
                    {/* <input type='text' onChange={(e)=> {setrequiredContext(e.target.value);} } onBlur={() =>task.outcome=outcome} value={outcome} className='fw3 white bn bg-transparent' /> */}
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>
                    <h5 className='fw3 white'>Status: {task.status}</h5>
                    <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5>
                </div>
                <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                <div className='pa2'>
                    {/* <p className='fw3 white'>{task.note}</p> */}
                    <textarea rows="4" cols="45" onChange={(e)=> {setnote(e.target.value);} } onBlur={ () =>task.note=note } value={note} className='fw3 white bn bg-transparent' />
                </div>
                <button className="button" onClick={startTimer}>START</button>
                <button className="button" onClick={markAsDone}>DONE</button>
            </div>
        </div>
    );
}
