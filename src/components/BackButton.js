import React from 'react';
import { connect } from 'react-redux';
import { selectView, selectItem, RestorePreviousState } from '../actions';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        previousView: state.selectViewReducer.previousView,
        itemID: state.selectItemReducer.itemID,
        previousItemID: state.selectItemReducer.previousItemID,
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
        restorePreviousState: (previousState) => {
            return dispatch(RestorePreviousState(previousState))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);



function BackButton({ restorePreviousState, previousState, changeItemID, onTouch, previousView, previousItemID }) {

    function goBack(){
        //onTouch(previousView)
        changeItemID(previousItemID);
        
    }
    return (
        <div className='whiteB w3 h3 flex items-center justify-center' onClick={goBack}>
            <h1 className=' white b f8 fw9 ma0'>B</h1>
        </div>
    )
}