import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import StatsOverview from '../components/StatsOverview';
import TaskOverview from '../components/TasksOverview';
import ProjectsOverview from '../components/ProjectsOverview';
import InboxOverview from '../components/InboxOverview';
import SkillsOverview from '../components/SkillsOverview';
import { setView } from '../actions';

const mapStateToProps = state => {
    return {
        view: state.view
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (event) => dispatch(setView(event.target.title))
    }
}
function Home(props) {

    useEffect(() => {
       
    })

    const { onTouch } = props;
    return (
        <div className="home-container" onClick={onTouch}>
            <StatsOverview />
            <div className="flex justify-center pb3 h-25">
                <ProjectsOverview />
                <TaskOverview />
            </div>
            <div className="flex justify-center pb3 h-25">
                <InboxOverview />
                <SkillsOverview />
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8