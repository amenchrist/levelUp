import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp, ShipItems } from '../actions';
import { REFERENCES, UPDATE } from '../constants';
import { pushChanges, ammendList  } from '../functions';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        itemID: state.values.itemID,
        previousView: state.values.previousView,
        exp: state.UpdateExpReducer.exp,
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
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceDetails);


function ReferenceDetails({ id , changeItemID, updateExp, db, shipItems, reference }) {

    const ReferenceList = db.Reference;
    // let reference = {};
    //let position;

    // for (let i=0; i<ReferenceList.length; i++){

    //     if (ReferenceList[i].id === id){
    //        reference = ReferenceList[i];
    //        //position = i;
    //        break;
    //     }
    // }

    console.log("reference: ", reference)

    const [ name, setName ] = useState(reference.name);
    const [ details, setDetails ] = useState(reference.details);

    useEffect(() => {
        setName(reference.name);
        setDetails(reference.details);
        
    }, [ reference.name, reference.details])

    function updateDB( obj, property, newVal) {

        if (obj[property] !== newVal){

            console.log(`old value (${obj[property]}) !== new value (${newVal})`)

            obj[property] = newVal;
            ammendList(db, REFERENCES, reference, UPDATE, shipItems)
          
        }

    }

    return (
        <div >
            <div>
                <div className='w-100 pa2 pb3' >
                    {/* <h3 className='fw7 b white pb2'>{reference.name}</h3> */}
                    <input type='text' 
                    className='bn fw7 b white bg-transparent'
                    value={name} 
                    onChange={(e)=> {setName(e.target.value);} } 
                    onBlur={() => {updateDB(reference, "name", name )} }  
                    />
                    <h5 className='fw3 white'>{reference.type}</h5>
                </div>
                <div className='pa2'>
                    <textarea rows="4" cols="45" 
                    onChange={(e)=> {setDetails(e.target.value);} } 
                    onBlur={ () =>{ updateDB(reference, "details", details ) }} 
                    value={details} 
                    className='fw3 white bn bg-transparent' />
                </div>
            </div>
        </div>
    );
}
