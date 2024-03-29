import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp, UpdateTaskStatus, ShipItems,ChangeNav } from '../actions';
import DatePicker from './DatePicker';
import Timer from './Timer';
import TaskControls from './TaskControls';
import { amendList  } from '../functions';
import { COMPLETED, DETAILS, DONE, MISSIONS, SOMEDAY, TASKS, UPDATE } from '../constants';
import Scroll from './Scroll';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        previousView: state.values.previousView,
        itemID: state.values.itemID,
        exp: state.UpdateExpReducer.exp,
        status: state.UpdateTaskStatusReducer.taskStatus,
        activeTask: state.SetActiveTaskReducer.activeTask,
        activeSince: state.SetActiveTaskReducer.activeSince,
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
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        },
        updateTaskStatus: (status) => {
            return dispatch(UpdateTaskStatus(status))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);


function TaskDetails({ id , title, updateExp, activeSince, activeTask, db, shipItems, changeNav, exp }) {

    const MissionsList = db.Missions;
    const tasks = db.Tasks;
    let task = {};
    let position, relevantList;

    title === SOMEDAY ? relevantList = db.Tasks.concat(db.Missions) : relevantList = tasks;

    for (let i=0; i<relevantList.length; i++){

        if (relevantList[i].id === id){
           task = relevantList[i];
           position = i;
           break;
        }
    }

    let associatedMission = {};
    if(task.associatedMissionID === 0){
        associatedMission.name = "Getting Things Done";
    } else if (task.associatedMissionID > 0){
        for(let i=0; i<MissionsList.length; i++){
            if(parseInt(task.associatedMissionID) === parseInt(MissionsList[i].id)){
                associatedMission = MissionsList[i];
                //console.log('associated project name: ', associatedMission.name)
                break;
            }
        }
    }

    const [ name, setName ] = useState(task.name);
    const [ requiredContext, setrequiredContext ] = useState(task.requiredContext);
    const [ outcome, setoutcome ] = useState(task.outcome);
    const [ dueDate, setdueDate ] = useState(task.dueDate);
  //  const [ timeRequired, settimeRequired ] = useState(task.timeRequired);
    const [ note, setnote ] = useState(task.note);
    const [ lastUpdated, setlastUpdated ] = useState(db.lastUpdated);


    useEffect(() => {
        setName(task.name);
        setrequiredContext(task.requiredContext);
        setoutcome(task.outcome);
        setnote(task.note);
        setdueDate(task.dueDate);
        console.log("Last Updated: ", db.lastUpdated)
    }, [task.name, task.requiredContext, task.outcome, task.note, task.dueDate, task.timeSpent, activeSince, activeTask, task.id, db.lastUpdated ])


    

    function updateDB( obj, property, newVal) {

        if (obj[property] !== newVal){
            console.log(`old value (${obj[property]}) !== new value (${newVal})`)

            obj[property] = newVal;
            amendList(db, TASKS, task, UPDATE, shipItems, exp)
          
        }
    
    }

    function changeNavigation(id, title){
       
        let nav = {
            title: title,
            view: DETAILS,
            ID: id
        }
        changeNav(nav);        
    }

    function saveDate(date){
        updateDB( task, "dueDate", date )
    }

    switch (title){
        case COMPLETED:
            
        default:
            //console.log("From task details: ", task)
            return (
                <div className='h-100' >
                    <Scroll>
                        <div className='w-100 pb3' >
                            {/* <h3 className='fw7 b white pb2'>{task.name}</h3>
                            <h4 className='fw1 white'>{task.requiredContext}</h4> */}
        
                            <textarea rows="2" cols="30" wrap='hard' 
                            onChange={(e)=> {setName(e.target.value);} } 
                            onBlur={() => { updateDB(task, "name", name ) } } 
                            value={name} className='bn fw9 b white bg-transparent pa1' />
        
                            <input type='text' onChange={(e)=> {setrequiredContext(e.target.value);} } 
                                onBlur={() =>{ updateDB(task, "requiredContext", requiredContext ) }} 
                                value={requiredContext} className='fw1 white bn bg-transparent' />
                            
                        </div>
        
                        <div className='w-100 pb3'>
                            <h5 className='fw3 white'>Mission: </h5>
                            <h4 className='fw5 white' onClick={() => {
                                if(task.associatedMissionID != 0){changeNavigation(task.associatedMissionID, MISSIONS)}}} >{associatedMission.name}</h4>
                        </div>
        
                        <div className='w-100 pb3'>
                            <h5 className='fw3 white'>Outcome: </h5>
                            {/* <h5 className='fw3 white'>{task.outcome} </h5> */}
                            <textarea rows="2" cols="45" onChange={(e)=> {setoutcome(e.target.value);} } onBlur={() =>{ updateDB(task, "outcome", outcome ) }} value={outcome} className='w-80 fw3 white bn bg-transparent' />
                        </div>
                        <div className='w-100 pb3 flex justify-between'>
                            <Timer timeSpent={task.timeSpent} task={task} />
                            {/* <input type='date' defaultValue={dueDate} onChange={(e)=> {setdueDate(e.target.value);} } onBlur={() =>task.dueDate=dueDate} className='fw3 white bn bg-transparent' /> */}
                        </div>
                        <h5 className='fw3 white'>DUE:</h5>
                        <DatePicker item={task} dueDate={dueDate} updateFunc={saveDate} />
                        <div className='w-100 pl2 pb3 flex justify-between'>                    
                            {/* <h5 className='fw3 white'>Time Required: {task.timeRequired}</h5>
                            <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                        </div>
                        <div className='pb2'>
                            <h5 className='bb b--white pb2 fw3 white b' >NOTE</h5>
                            <div className='pa2'>
                                {/* <p className='fw3 white'>{task.note}</p> */}
                                <textarea rows="2" cols="45" onChange={(e)=> {setnote(e.target.value);} } onBlur={ () =>{ updateDB(task, "note", note )}} value={note} className='fw3 white bn bg-transparent' />
                            </div>
                        </div>
                        <h5 className='fw3 white'>Status: {task.status}</h5>
                    </Scroll>
                        <TaskControls task={task} position={position} />
                </div>
            );
    }
}
