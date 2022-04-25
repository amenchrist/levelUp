import React from 'react';
import { MissionsList } from '../MissionsList';
import List from '../components/List';
import { connect } from 'react-redux';
import { selectItem } from '../actions';
import MissionDetails from '../components/MissionDetails';

const mapStateToProps = state => {
    return {
        itemID: state.selectItemReducer.itemID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

function Missions(props) {

    const { onTouch } = props;
    const { itemID } = props;

    function passKey(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForKey(targ);
        function checkForKey(t) {
            if (t.id) {
                 onTouch(t.id);
            } else {
                t = t.parentNode;
                checkForKey(t);   
            }
        }
    }

    switch(itemID === "0" || itemID === 0) {
        case  false:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <h1 className='tc'>Mission</h1>
                    <MissionDetails id={parseInt(itemID)} />
                </div>        
            )
        default:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <h1 className='tc'>Missions</h1>
                    <List content={MissionsList} touchFunction={passKey}/>
                </div>        
            )
            
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Missions);