import React, { useState } from 'react';
import { connect } from 'react-redux';
import Processor from '../containers/Processor'
import PrevItemButton from '../components/PrevItemButton';
import NextItemButton from '../components/NextItemButton';
import NewItemButton from '../components/NewItemButton';

const mapStateToProps = state => {
    return {
        db: state.items.record.items//state.RetrieveDBReducer.db
    }
}

function ItemDetails({ id, touchFunction, selectAnother, prevID, nextID, db }) {


    // NOTE: PREV AND NEXT BUTTONS INCLUDED HERE SO THEY ARE HIDDEN DURING PROCESSING
    const InboxItems = db.Inbox

    const [ readyToProcess, setReadyToProcess ] = useState(false);

    let item = {};
    let nextItemID = null;
    let indx;
    for (let i=0; i<InboxItems.length; i++){

        if (InboxItems[i].id === id){
           item = InboxItems[i];
           indx = i;
           if (InboxItems[i+1]) {
               nextItemID = InboxItems[i+1].id;
           } else {
            nextItemID = 0;
           }
           break;
        }    
    }

    console.log(item);

    if (item.name) {
        switch(readyToProcess){
        case false:
            return (
                <div className='h-100' >
                    <h5 className='white b pb2'>Name: {item.name}</h5>
                    <h5 className='white pb2'>Entry Date: {(new Date(item.entryDate)).toISOString().substr(0, 10)} </h5>
                    {/* <h5 className='white pb2'>Status: {item.status} </h5> */}
                    <div className='h-100 w-100 center br1 pa3 ba b--black-10 flex items-center flex-column ' >
                        <button onClick={()=> setReadyToProcess(true)} >PROCESS THIS</button>
                    </div>
                    <NewItemButton />
                    <div className='flex justify-between self-end'>
                        <PrevItemButton selectAnother={selectAnother} prevID={prevID} currentID={id} />
                        <NextItemButton selectAnother={selectAnother} nextID={nextID} currentID={id} />
                    </div>
                </div>
            )
        default:
            return (
                <div >
                    <h5 className='white b pb2'>Name: {item.name}</h5>
                    <h5 className='white pb2'>Entry Date: {(new Date(item.entryDate)).toISOString().substr(0, 10)} </h5>
                    <br />
                    <Processor item={item} nextItemID={nextItemID} touchFunction={touchFunction} itemIndex={indx} />
                </div>
            );
        }
    }
    
}

export default connect(mapStateToProps)(ItemDetails);