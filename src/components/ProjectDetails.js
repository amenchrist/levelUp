import React, { useState, useEffect } from 'react';
import List from './List';
import { MISSION, PROJECTS } from '../constants';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp, RestorePreviousState, ShipItems } from '../actions';
import { displayDays, ammendList  } from '../functions';
import { UPDATE } from '../constants';
import DatePicker from './DatePicker';
import NewItemButton from './NewItemButton';

const mapStateToProps = state => {
    return {
        view: state.values.view,
        previousView: state.values.previousView,
        itemID: state.values.itemID,
        exp: state.UpdateExpReducer.exp,
        previousState: state.RestorePreviousStateReducer.previousState,
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
        restorePreviousState: (previousState) => {
            return dispatch(RestorePreviousState(previousState))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

function ProjectDetails({ project, view, changeItemID, db, shipItems, exp }) {

    const TaskList = db.Tasks.concat(db.Completed);

    function passKey(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForID(targ);
        function checkForID (t) {
            if (t.id) {
                changeItemID(t.id);
            } else {
                t = t.parentNode;
                checkForID (t);   
            }
        }
    }
    
    function getTasks(){
        let tasks = [];
        if(project.taskList !== []){
            for(let i=0; i<project.taskList.length; i++){
                for(let j=0; j<TaskList.length; j++){
                    if(project.taskList[i] === TaskList[j].id ){
                        tasks.push(TaskList[j]);
                        break;
                    }
                }
            }
        }
        console.log(tasks);
        return tasks;
    }

    const projectTasks = getTasks();

    const [ name, setName ] = useState(project.name);
    const [ purpose, setPurpose ] = useState(project.purpose);
    const [ description, setDescription ] = useState(project.description);
    const [ dueDate, setdueDate ] = useState(project.dueDate);
    const [ timeRequired, setTimeRequired ] = useState(project.timeRequired);
    const [ lastUpdated, setlastUpdated ] = useState(db.lastUpdated);

    useEffect(() => {
        setName(project.name);
        setTimeRequired(project.timeRequired);
        setPurpose(project.purpose);
        setDescription(project.description);
        setdueDate(project.dueDate);
        console.log("Last Updated: ", db.lastUpdated)
    }, [project.name, project.timeRequired, project.purpose, project.dueDate, project.description, db.lastUpdated ])

    function updateDB( obj, property, newVal) {

        if (obj[property] !== newVal){

            console.log(`old value (${obj[property]}) !== new value (${newVal})`)

            obj[property] = newVal;
            ammendList(db, PROJECTS, project, UPDATE, shipItems, exp)
          
        }

    }

    function saveDate(date){
        updateDB( project, "dueDate", date )
    }

    return (
        <div className='h-80'>
            <div className='w-100 h-10 pa2 pb3' >

                <input type='text' 
                className='bn fw7 b white bg-transparent'
                value={name} 
                onChange={(e)=> {setName(e.target.value);} } 
                onBlur={() => {updateDB(project, "name", name )} }  
                />

                <h4 className='fw1 white'>{displayDays(project.dueDate)}</h4>
            </div>

            <div className='w-100 h-20 pl2 pt3'>
                <div className='w-100 pl2 pb1'>
                    <h5 className='fw3 white'>Description: </h5>
                    <textarea rows="2" cols="100" 
                    className='w-80 fw3 white bn bg-transparent' 
                    value={description} 
                    onChange={(e)=> {setDescription(e.target.value);} } 
                    onBlur={() =>{ updateDB(project, "description", description ) }} 
                    />
                </div>
            </div>
            <div className='w-100 h-10 pl2 pb2'>
                <h5 className='fw3 white'>Purpose: </h5>
                {/* <h5 className='fw3 white'>{project.purpose} </h5> */}

                <input type='text' 
                className='bn fw3 b white bg-transparent' 
                value={purpose} 
                onChange={(e)=> {setPurpose(e.target.value);} } 
                onBlur={() => {updateDB(project, "purpose", purpose )} } 
                />

            </div>
            <div className='w-100 h-10 pl2 pb2 flex justify-between'>
                {/* <h5 className='fw3 white'>Due: {project.dueDate} </h5> */}
                <DatePicker item={project} dueDate={dueDate} updateFunc={saveDate} />
                {/* <h5 className='fw3 white'>Time Required: {project.timeRequired}</h5> */}
            </div>
            <div className='w-100 h-10 pl2 pb3 flex justify-between'>
                <h5 className='fw3 white'>Status: {project.status}</h5>
                {/* <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
            </div>
            <div className='flex justify-between items-center'>
                <h5 className='bb b--white pa2 fw3 white b' >TASKS</h5>
                <NewItemButton />
            </div> 
            <div className='pa2 h-30'>
                <List content={projectTasks} filter={MISSION} touchFunction={passKey} />
            </div>
            
        </div>
    );
}