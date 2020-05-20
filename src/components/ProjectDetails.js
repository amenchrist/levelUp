import React from 'react';
import List from './List';
import { MISSION } from '../constants';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp, RestorePreviousState } from '../actions';
import { TaskList } from '../TaskList';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        previousView: state.selectViewReducer.previousView,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp,
        previousState: state.RestorePreviousStateReducer.previousState
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

function ProjectDetails({ project, view, changeItemID }) {
    

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

    return (
        <div>
            <div className='w-100 pa2 pb3' >
                <h3 className='fw7 b white pb2'>{project.name}</h3>
                <h4 className='fw1 white'>{project.type}</h4>
            </div>
            <div className='w-100 pl2 pb3'>
                <h5 className='fw3 white'>Outcome: </h5>
                <h5 className='fw3 white'>{project.outcome} </h5>
            </div>
            <div className='w-100 pl2 pb3'>
                <h5 className='fw3 white'>Purpose: </h5>
                <h5 className='fw3 white'>{project.purpose} </h5>
            </div>
            <div className='w-100 pl2 pb3 flex justify-between'>
                <h5 className='fw3 white'>Due: {project.dueDate} </h5>
                <h5 className='fw3 white'>Time Required: {project.timeRequired}</h5>
            </div>
            <div className='w-100 pl2 pb3 flex justify-between'>
                <h5 className='fw3 white'>Status: {project.status}</h5>
                <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5>
            </div>
            <h5 className='bb b--white pa2 fw3 white b' >TASKS</h5>
            <div className='pa2'>
                <List content={projectTasks} filter={MISSION} touchFunction={passKey} />
            </div>
            
        </div>
    );
}