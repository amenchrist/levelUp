import React, { useState, useEffect } from 'react';
//import { TaskList } from '../TaskList';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp, UpdateTaskStatus, ShipItems } from '../actions';
import DatePicker from './DatePicker';
import Timer from './Timer';
import TaskControls from './TaskControls';
import { pushChanges  } from '../functions';
import { COMPLETED, UPDATE } from '../constants';

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
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        },
        updateTaskStatus: (status) => {
            return dispatch(UpdateTaskStatus(status))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);


function TaskDetails({ id , title, updateExp, status, updateTaskStatus, activeSince, activeTask, db, shipItems }) {

    const ProjectList = db.Projects;
    const tasks = db.Tasks;
    let task = {};
    let position;

    for (let i=0; i<tasks.length; i++){

        if (tasks[i].id === id){
           task = tasks[i];
           position = i;
           break;
        }
    }

    let associatedProject = {};
    if(task.associatedProjectID === 0){
        associatedProject.name = "Getting Things Done";
    } else if (task.associatedProjectID > 0){
        for(let i=0; i<ProjectList.length; i++){
            if(parseInt(task.associatedProjectID) === parseInt(ProjectList[i].id)){
                associatedProject = ProjectList[i];
                console.log('associated project name: ', associatedProject.name)
                break;
            }
        }
    }
    // console.log(task)
    // console.log('associated project ID: ', task.associatedProjectID)
    // console.log('associated project name: ', associatedProject.name)

    const [ name, setName ] = useState(task.name);
    const [ requiredContext, setrequiredContext ] = useState(task.requiredContext);
    const [ outcome, setoutcome ] = useState(task.outcome);
    const [ dueDate, setdueDate ] = useState(task.dueDate);
  //  const [ timeRequired, settimeRequired ] = useState(task.timeRequired);
    const [ note, setnote ] = useState(task.note);
    const [ lastUpdated, setlastUpdated ] = useState(db.lastUpdated);
    //const [ associatedProjectName, setAssociatedProjectName ] = useState(associatedProject.name);


    useEffect(() => {
        setName(task.name);
        setrequiredContext(task.requiredContext);
        setoutcome(task.outcome);
        setnote(task.note);
        setdueDate(task.dueDate);
        console.log("Last Updated: ", db.lastUpdated)
    }, [task.name, task.requiredContext, task.outcome, task.note, task.dueDate, task.timeSpent, activeSince, activeTask, task.id, db.lastUpdated ])



    function updateDB(change) {
        console.log("changes")
     
        pushChanges(UPDATE, task, "Tasks", shipItems);
        // if (oldValue !== newValue){
        //     oldValue = newValue;
        //     console.log(oldValue)
        //     console.log("old time: ", lastUpdated);
        //     db.lastUpdated = (new Date()).getTime();
        //     setlastUpdated(db.lastUpdated);
            
        // }
    }

    switch (title){
        case COMPLETED:
            
        default:
            return (
                <div className='' >
                    <div>
                        <div className='w-100 pa2 pb3' >
                            {/* <h3 className='fw7 b white pb2'>{task.name}</h3>
                            <h4 className='fw1 white'>{task.requiredContext}</h4> */}
        
                            <input type='text' onChange={(e)=> {setName(e.target.value);} } onBlur={() => {task.name = name; updateDB();} } 
                            value={name} className='bn fw9 b white bg-transparent' />
        
                            <input type='text' onChange={(e)=> {setrequiredContext(e.target.value);} } 
                                onBlur={() =>{ task.requiredContext = requiredContext; updateDB(); }} 
                                value={requiredContext} className='fw1 white bn bg-transparent' />
                            
                        </div>
        
                        <div className='w-100 pl2 pb3'>
                            <h5 className='fw3 white'>Mission: </h5>
                            <h4 className='fw5 white'>{associatedProject.name}</h4>
                        </div>
        
                        <div className='w-100 pl2 pb3'>
                            <h5 className='fw3 white'>Outcome: </h5>
                            {/* <h5 className='fw3 white'>{task.outcome} </h5> */}
                            <textarea rows="2" cols="45" onChange={(e)=> {setoutcome(e.target.value);} } onBlur={() =>{ task.outcome = outcome; updateDB(); }} value={outcome} className='w-80 fw3 white bn bg-transparent' />
                        </div>
                        <div className='w-100 pl2 pb3 flex justify-between'>
                            <Timer timeSpent={task.timeSpent} task={task} />
                            <DatePicker item={task} dueDate={dueDate} />
                            {/* <input type='date' defaultValue={dueDate} onChange={(e)=> {setdueDate(e.target.value);} } onBlur={() =>task.dueDate=dueDate} className='fw3 white bn bg-transparent' /> */}
                        </div>
                        <div className='w-100 pl2 pb3 flex justify-between'>                    
                            {/* <h5 className='fw3 white'>Time Required: {task.timeRequired}</h5>
                            <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                        </div>
                        <h5 className='fw3 white'>Status: {task.status}</h5>
                        <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                        <div className='pa2'>
                            {/* <p className='fw3 white'>{task.note}</p> */}
                            <textarea rows="4" cols="45" onChange={(e)=> {setnote(e.target.value);} } onBlur={ () =>{ updateDB(); task.note = note }} value={note} className='fw3 white bn bg-transparent' />
                        </div>
                        <TaskControls task={task} position={position} />
                        {/* <button className="button" onClick={startTimer}>START</button>
                        <button className="button" onClick={markAsDone}>DONE</button> */}
                    </div>
                </div>
            );
    }
}
