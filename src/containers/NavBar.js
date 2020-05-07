import React from 'react';
import { connect } from 'react-redux';
import HomeButton from '../components/HomeButton';
import ProjectsButton from '../components/ProjectsButton';
import TasksButton from '../components/TasksButton';
import InboxButton from '../components/InboxButton';
import SkillsButton from '../components/SkillsButton';
import { selectView, selectItem } from '../actions';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        itemID: state.selectItemReducer.itemID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeView: (title) => {
            return dispatch(selectView(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

function NavBar(props) {
    const { changeView, changeItemID } = props;
    function passTitle(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForKey(targ)
        function checkForKey (t) {
            if (t.id) {
                changeItemID(t.id);
            } else {
                t = t.parentNode;
                changeItemID(t);   
            }
        }
        checkForTitle(targ)
        function checkForTitle(t) {
            if (t.title) {
                changeView(t.title);
            } else {
                t = t.parentNode;
                checkForTitle(t);   
            }
        }
    }

    return (
        <div className='navbar center flex'>
            <HomeButton touchFunction={passTitle} />
            <ProjectsButton touchFunction={passTitle} />
            <TasksButton touchFunction={passTitle} />
            <SkillsButton touchFunction={passTitle} />
            <InboxButton touchFunction={passTitle} />
        </div>       
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)