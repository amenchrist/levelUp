import React from 'react';
import './Home.css';
import StatsOverview from './components/StatsOverview';
import TaskOverview from './components/TasksOverview';
import ProjectsOverview from './components/ProjectsOverview';
import InboxOverview from './components/InboxOverview';
import SkillsOverview from './components/SkillsOverview';

function Home() {
    return (
        <div className="home-container">
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

export default Home;

//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8