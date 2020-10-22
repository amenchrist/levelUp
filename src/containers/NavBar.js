import React from 'react';
import { connect } from 'react-redux';
import HomeButton from '../components/HomeButton';
import ProjectsButton from '../components/ProjectsButton';
import TasksButton from '../components/TasksButton';
import InboxButton from '../components/InboxButton';
import StatsButton from '../components/StatsButton';
import { selectTitle } from '../actions';
import { passTitle } from '../functions';

const mapStateToProps = state => {
    return {
        view: state.values.view
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTitle: (title) => {
            return dispatch(selectTitle(title))
        }
    }
}

function NavBar(props) {

    const { changeTitle } = props;

    function handleEvent(e){
        passTitle(e, changeTitle);
    }

    // function passTitle(e) {
    //     //Takes the events target and checks for title attribute 
    //     //If no title attribute, check parent node for title attribute
    //     //If not found, repeat step 2
    //     let targ = e.target;
    //     checkForTitle(targ)
    //     function checkForTitle(t) {
    //         if (t.title) {
    //             changeView(t.title);
    //             changeItemID(0);
    //         } else {
    //             t = t.parentNode;
    //             checkForTitle(t);   
    //         }
    //     }
    // }

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