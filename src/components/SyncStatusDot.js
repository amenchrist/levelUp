import React from 'react';
import { connect } from 'react-redux';
import { ShipItems, ChangeNav } from '../actions';


const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        ID: state.values.itemID,
        db: state.items.record.items,
        isShipping: state.items.latestUpdate.isShipping
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SyncStatusDot);


function SyncStatusDot({ shipItems, changeNav, db, title, ID, isShipping }) {

    let color;
    if (isShipping) {
        color = 'red'
    } else {
        color = 'green'
    }
    const style ={
        color: color
    }
  
    return (
        <div className='flex justify-end'>
            <h2 className='fw8 pa0 ma0' style={style}>.</h2>
        </div>
    )
}