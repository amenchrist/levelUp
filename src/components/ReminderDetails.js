import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { UpdateExp, ChangeNav, ShipItems } from '../actions';
import { ASAP, DETAILS, PROJECTS, REMINDERS, UPDATE } from '../constants';
import { ammendList } from '../functions';
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


function ReminderDetails({ changeNav,  item, shipItems, db }) {

    const [ name, setName ] = useState(item.name);
    const [ note, setnote ] = useState(item.note);

    useEffect(() => {
        setName(item.name);
        setnote(item.note);
        
    }, [ item.name, item.note])

    function updateDB( obj, property, newVal) {

        if (obj[property] !== newVal){

            console.log(`old value (${obj[property]}) !== new value (${newVal})`)

            obj[property] = newVal;
            ammendList(db, REMINDERS, item, UPDATE, shipItems)
          
        }

    }

    function saveDate(date){
        updateDB( item, "date", date )
    }
    
    return (
        <div className='' >
            <div>
                <div className='w-100 pa2 pb3' >
                    {/* <h3 className='fw7 b white pb2'>{item.name}</h3> */}

                    <input type='text' 
                    className='bn fw7 b white bg-transparent'
                    value={name} 
                    onChange={(e)=> {setName(e.target.value);} } 
                    onBlur={() => {updateDB(item, "name", name )} }  
                    />

                    <h4 className='fw1 white'>{item.type}</h4>
                </div>

                <div className='w-100 pl2 pb3'>
                    <h5 className='fw3 white'>Date: </h5>
                    <DatePicker item={item} dueDate={item.date} updateFunc={saveDate}/>
                </div>

                <h5 className='bb b--white pa2 fw3 white b' >NOTE</h5>
                <div className='pa2'>
                    <textarea rows="4" cols="45" 
                    onChange={(e)=> {setnote(e.target.value);} } 
                    onBlur={ () =>{ updateDB(item, "note", note )}} 
                    value={note} 
                    className='fw3 white bn bg-transparent' />
                </div>
            </div>
        </div>
    )
}
