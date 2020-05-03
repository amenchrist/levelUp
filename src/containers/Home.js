import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StatsOverview from '../components/StatsOverview';
import TaskOverview from '../components/TasksOverview';
import ProjectsOverview from '../components/ProjectsOverview';
import InboxOverview from '../components/InboxOverview';
import SkillsOverview from '../components/SkillsOverview';
import { setView } from '../actions';
import Projects from './Projects';
import { PROJECTS, SKILLS, STATS, TASKS, INBOX } from '../contants';
import Tasks from './Tasks';
import Skills from './Skills';
import Stats from './Stats';
import Inbox from './Inbox';
import './Home.css';

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
function Home(props) {

    useEffect(() => {
       
    })

    const { onTouch } = props;
    const { view } = props;

    switch(view) {
        case PROJECTS:
            return (
                <Projects />
            )
        case SKILLS:
            return (
                <Skills />
            )
        case STATS:
            return (
                <Stats />
            )
        case INBOX:
            return (
                <Inbox />
            )
        case TASKS:
            return (
                <Tasks />
            )
        default:
            return (
                <div className="home-container" >
                    <StatsOverview touchFunction={onTouch} />
                    <div className="flex justify-center pb3 h-15">
                        <ProjectsOverview touchFunction={onTouch} />
                        <TaskOverview touchFunction={onTouch} />
                    </div>
                    <div className="flex justify-center pb3 h-15">
                        <InboxOverview touchFunction={onTouch}/>
                        <SkillsOverview touchFunction={onTouch}/>
                    </div>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8