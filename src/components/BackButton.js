import React from 'react';
import { connect } from 'react-redux';
import { selectView, selectItem, RestorePreviousState, ChangeNav } from '../actions';
import { LIST, MISSION_TASKS, PROJECTS } from '../constants';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        itemID: state.values.itemID,
        previousTitle: state.values.previousTitle,
        previousView: state.values.previousView,
        previousItemID: state.values.previousItemID,
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
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);



function BackButton({ changeItemID, changeNav, id, title, previousTitle, previousView, previousItemID }) {

    function goBack(){

        if(title === MISSION_TASKS) {title = PROJECTS};

        let nav = {
            title: title,
            view: LIST,
            ID: 0
        }
        //changeItemID(id);
        changeNav(nav);
        
    }
    return (
        <div className='whiteB w3 h3 flex items-center justify-center' onClick={goBack}>
            <h1 className=' white b f8 fw9 ma0'>&lt;</h1>
        </div>
    )
}