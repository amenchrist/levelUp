import React from 'react';
import { ReferenceList } from '../ReferenceList';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp } from '../actions';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        previousView: state.selectViewReducer.previousView,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceDetails);


function ReferenceDetails({ id , changeItemID, updateExp }) {

    const db = ReferenceList;
    let reference = {};
    //let position;

    for (let i=0; i<db.length; i++){

        if (db[i].id === id){
           reference = db[i];
           //position = i;
           break;
        }
    }


    return (
        <div >
            <div>
                <div className='w-100 pa2 pb3' >
                    <h3 className='fw7 b white pb2'>{reference.name}</h3>
                    <h5 className='fw3 white'>Status: {reference.status}</h5>
                </div>
                <h5 className='bb b--white pa2 fw3 white b' >Description</h5>
                <div className='pa2'>
                    <p className='fw3 white'>{reference.description}</p>
                </div>
            </div>
        </div>
    );
}
