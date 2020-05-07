import React from 'react';
import List from '../components/List';
import { TaskList } from '../TaskList';
import { connect } from 'react-redux';
import { selectItem } from '../actions';
import TaskDetails from '../components/TaskDetails';

const mapStateToProps = state => {
    return {
        itemID: state.selectItemReducer.itemID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

function Tasks(props) {

    const { changeItemID } = props;
    const { itemID } = props;

    function passKey(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForID(targ);
        function checkForID (t) {
            if (t.id) {
                changeItemID(t.id);
            } else {
                t = t.parentNode;
                checkForID (t);   
            }
        }
    }

    switch(itemID === '0' || itemID === 0) {
        case  false:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <h1 className='tc'>Tasks</h1>
                    <TaskDetails id={parseInt(itemID)} />
                </div>        
            )
        default:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <h1 className='tc'>Tasks</h1>
                    <List content={TaskList} touchFunction={passKey}/>
                </div>        
            )
            
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);