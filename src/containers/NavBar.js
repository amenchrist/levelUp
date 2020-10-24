import React from 'react';
import { connect } from 'react-redux';
import HomeButton from '../components/HomeButton';
import ProjectsButton from '../components/ProjectsButton';
import TasksButton from '../components/TasksButton';
import InboxButton from '../components/InboxButton';
import StatsButton from '../components/StatsButton';
import { ChangeNav } from '../actions';
import { setNavValues } from '../functions';

const mapStateToProps = state => {
    return {
        view: state.values.view,
        state: state.values
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

function NavBar(props) {

    const { changeNav, state } = props;

    function handleEvent(e){
        setNavValues(e, changeNav, state);
    }

    return (
        <div className='navbar center flex'>
            <HomeButton touchFunction={handleEvent} />
            <InboxButton touchFunction={handleEvent} />
            <TasksButton touchFunction={handleEvent} />
            <ProjectsButton touchFunction={handleEvent} />
            <StatsButton touchFunction={handleEvent} />
        </div>       
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)