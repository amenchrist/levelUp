import React, { useState } from 'react';
import { connect } from 'react-redux';
import { UpdateExp, ChangeNav, ShipItems } from '../actions';
import { ASAP, DETAILS, PROJECTS, UPDATE } from '../constants';
import { calculateTime, pushChanges } from '../functions';
import DatePicker from './DatePicker';


const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        previousView: state.values.previousView,
        itemID: state.values.itemID,
        exp: state.UpdateExpReducer.exp,
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
        },
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderDetails);


function ReminderDetails({ changeNav,  item, shipItems }) {

    const [ note, setnote ] = useState(item.note);

    function changeNavigation(id, title){
       
        let nav = {
            title: title,
            view: DETAILS,
            ID: id
        }
        changeNav(nav);        
    }

    function updateDB(change) {
        console.log("changes")
     
        pushChanges(UPDATE, item, "Reminders", shipItems);

    }
    
    return (
        <div className='' >
            <div>
                <div className='w-100 pa2 pb3' >
                    <h3 className='fw7 b white pb2'>{item.name}</h3>
                    <h4 className='fw1 white'>{item.type}</h4>
                </div>

                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Date: </h5>
                    <DatePicker item={item} dueDate={item.date} />
                </div>

                <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                <div className='pa2'>
                    <textarea rows="4" cols="45" 
                    onChange={(e)=> {setnote(e.target.value);} } 
                    onBlur={ () =>{ updateDB(); item.note = note }} 
                    value={note} 
                    className='fw3 white bn bg-transparent' />
                </div>
            </div>
        </div>
    )
}
