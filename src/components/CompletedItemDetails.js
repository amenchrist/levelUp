import React from 'react';
import { connect } from 'react-redux';
import { UpdateExp, ChangeNav, ShipItems } from '../actions';
import { ASAP, DETAILS, PROJECTS } from '../constants';
import { calculateTime } from '../functions';


const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        itemID: state.values.itemID,
        previousView: state.values.previousView,
        exp: state.UpdateExpReducer.exp,
        status: state.UpdateTaskStatusReducer.taskStatus,
        activeTask: state.SetActiveTaskReducer.activeTask,
        activeSince: state.SetActiveTaskReducer.activeSince,
        db: state.items.record.items 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedItemDetails);


function CompletedItemDetails({ ProjectList, changeNav,  item }) {

    //GET THE ASSOCIATED PROJECT NAME
    console.log("reached completed stage");
    let associatedProject = {}
    if(item.associatedProjectID === 0){
        associatedProject.name = "Getting Things Done";
    } else if (item.associatedProjectID > 0){
        for(let i=0; i<ProjectList.length; i++){
            if(parseInt(item.associatedProjectID) === parseInt(ProjectList[i].id)){
                associatedProject = ProjectList[i];
                console.log('associated project name: ', associatedProject.name)
                break;
            }
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

    console.log("completed" ,item)
    
    return (
        <div className='' >
            <div>
                <div className='w-100 pa2 pb3' >
                    <h3 className='fw7 b white pb2'>{item.name}</h3>
                    <h4 className='fw1 white'>{item.requiredContext}</h4>
                    
                </div>

                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Mission: </h5>
                    <h4 className='fw5 white' onClick={() => {
                        if(item.associatedProjectID != 0){changeNavigation(item.associatedProjectID, PROJECTS)}}}>{associatedProject.name}</h4>
                </div>

                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Outcome: </h5>
                    <h5 className='fw3 white'>{item.outcome} </h5>
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>
                    <h5 className='fw3 white'>Time Spent: {calculateTime(item.timeSpent)}</h5>
                    <h5 className='fw3 white'>Due Date: {item.dueDate === ASAP ? ASAP : new Date(item.dueDate).toDateString()} </h5>
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>
                    <h5 className='fw3 white'>COMPLETED: {new Date(item.doneDate).toLocaleString()} </h5>
                </div>
                <div className='w-100 pl2 pb3 flex justify-between'>           
                    {/* <h5 className='fw3 white'>Time Required: {task.timeRequired}</h5>
                    <h5 className='fw3 white'>Time Remaining: 12:34:50 </h5> */}
                </div>
                <h5 className='fw3 white'>Status: {item.status}</h5>
                <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                <div className='pa2'>
                    <p className='fw3 white'>{item.note}</p>
                </div>
            </div>
        </div>
    )
}
