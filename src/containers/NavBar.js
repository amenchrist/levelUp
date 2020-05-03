import React from 'react';
import { connect } from 'react-redux';
import HomeButton from '../components/HomeButton';
import ProjectsButton from '../components/ProjectsButton';
import TasksButton from '../components/TasksButton';
import InboxButton from '../components/InboxButton';
import SkillsButton from '../components/SkillsButton';
import { setView } from '../actions';

const mapStateToProps = state => {
    return {
        view: state.view
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(setView(title))
        }
    }
}

function NavBar(props) {
    const { onTouch } = props;
    function passTitle(e) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForTitle(targ)
        function checkForTitle (t) {
            if (t.title) {
                 onTouch(t.title);
            } else {
                t = t.parentNode;
                checkForTitle (t);   
            }
        }
    }

    return (
        <div className='navbar center flex justify-between'>
            <HomeButton touchFunction={passTitle} />
            <ProjectsButton touchFunction={passTitle} />
            <TasksButton touchFunction={passTitle} />
            <SkillsButton touchFunction={passTitle} />
            <InboxButton touchFunction={passTitle} />
        </div>       
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)