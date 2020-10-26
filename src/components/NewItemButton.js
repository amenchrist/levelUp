import React from 'react';
import { connect } from 'react-redux';
import { selectView } from '../actions';
import { NEW } from '../constants';

const mapStateToProps = state => {
    return {
        title: state.values.title,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeView: (view) => {
            return dispatch(selectView(view))
        }
    }
}

function NewItemButton({ changeView }) {

    return (
        <div className='whiteB w2 h2 flex items-center justify-center' onClick={ () => changeView(NEW)}>
            <h1 className=' white b f8 fw9 ma0'>+</h1>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemButton);