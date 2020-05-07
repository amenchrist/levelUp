import React from 'react';
import { ProjectList } from '../ProjectList';
import List from '../components/List';
import { connect } from 'react-redux';
import { selectItem } from '../actions';
import ProjectDetails from '../components/ProjectDetails';

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

function Projects(props) {

    const { onTouch } = props;
    const { itemID } = props;

    function passKey(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForTitle(targ);
        function checkForTitle (t) {
            if (t.id) {
                 onTouch(t.id);
            } else {
                t = t.parentNode;
                checkForTitle (t);   
            }
        }
    }

    switch(itemID === "0" || itemID === 0) {
        case  false:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <h1 className='tc'>Project</h1>
                    <ProjectDetails id={parseInt(itemID)} />
                </div>        
            )
        default:
            return (
                <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                    <h1 className='tc'>Projects</h1>
                    <List content={ProjectList} touchFunction={passKey}/>
                </div>        
            )
            
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);