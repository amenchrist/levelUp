import React from 'react';
import { connect } from 'react-redux';
import { UpdateExp, ChangeNav, ShipItems } from '../actions';
import { DETAILS, INBOX_ITEM, MISSION, REFERENCE, EVENT, REMOVE, TASK, ADD, INBOX, TASKS, MISSIONS, REFERENCES, EVENTS, UPDATE } from '../constants';
import { calculateTime, pushChanges } from '../functions';


const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        itemID: state.values.itemID,
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

export default connect(mapStateToProps, mapDispatchToProps)(TrashedItemDetails);


function TrashedItemDetails({ changeNav, item, db, shipItems }) {

    function restore(){
        let list, dbList, title;
        switch(item.type){
            case INBOX_ITEM:
                list = db.Inbox;
                dbList = "Inbox";
                title = INBOX;
            break;
            case TASK:
                list = db.Tasks;
                dbList = "Tasks";
                title = TASKS;
            break;
            case MISSION:
                list = db.Missions;
                dbList = "Missions";
                title = MISSIONS;
            break;
            case REFERENCE:
                list = db.References;
                dbList = "References";
                title = REFERENCES;
            break;
            case EVENT:
                list = db.Events;
                dbList = "Events";
                title = EVENTS;
            break;
            default:
        }
        item.isTrashed = false;
        item.trashedDate = 0;
        // const itemIndex = db.Trash.indexOf(item.id);
        // db.Trash.splice(itemIndex,1);
        // pushChanges(REMOVE, item, "Trash", shipItems);
        //list.unshift(item);
        pushChanges(UPDATE, item, dbList, shipItems)
        changeNavigation(item.id, title)
    }


    function changeNavigation(id, title){
       
        let nav = {
            title: title,
            view: DETAILS,
            ID: id
        }
        changeNav(nav);        
    }
    
    return (
        <div>
            <div className='w-100 pa2 pb3' >
                <h3 className='fw7 b white pb2'>{item.name}</h3>
                <h4 className='fw1 white'>{item.type}</h4>
            </div>
            <div className='w-100 pl2 pb3'>
                <h5 className='fw3 white'>Trashed Date: {new Date((item.trashedDate)).toLocaleString()}</h5>
            </div>
            <div className='w-100 ba bw1 b--white tc pb2'>
                <h5 className='fw3 white' onClick={restore}>RESTORE</h5>
            </div>
        </div>
    )
}
