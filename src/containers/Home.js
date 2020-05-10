import React from 'react';
import { connect } from 'react-redux';
import StatsOverview from '../components/StatsOverview';
import TaskOverview from '../components/TasksOverview';
import ProjectsOverview from '../components/ProjectsOverview';
import InboxOverview from '../components/InboxOverview';
import SkillsOverview from '../components/SkillsOverview';
import { selectView, selectItem } from '../actions';
import { PROJECTS, STATS, TASKS, INBOX, PROJECT, TASK, INBOX_ITEM, SKILLS, NEW_ITEM } from '../constants';
// import Projects from './Projects';
// import Tasks from './Tasks';
// import Skills from './Skills';
// import Stats from './Stats';
// import Inbox from './Inbox';
import List from '../components/List';
import { db } from '../db';
import './Home.css';
import TaskDetails from '../components/TaskDetails';
import ProjectDetails from '../components/ProjectDetails';
import ItemDetails from '../components/ItemDetails';
import NewItemButton from '../components/NewItemButton';
import NewItem from '../components/NewItem';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        itemID: state.selectItemReducer.itemID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

function Home(props) {
    
    const { view, itemID, onTouch, changeItemID } = props;
    
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

    function passTitle(e) {
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

    switch( (view === SKILLS || view === NEW_ITEM)|| ((view === PROJECTS || view === TASKS) || (view === STATS || view === INBOX)) ) {
        // case PROJECTS:
        //     return (
        //         <Projects />
        //     )
        // case SKILLS:
        //     return (
        //         <Skills />
        //     )
        // case STATS:
        //     return (
        //         <Stats />
        //     )
        // case INBOX:
        //     return (
        //         <Inbox />
        //     )
        // case TASKS:
        //     return (
        //         <Tasks />
        //     )
        case true:
            if (itemID === "0" || itemID === 0) {
                if (view === NEW_ITEM) {
                    return (
                        <NewItem submitFunction={passTitle} />
                    )
                } else {
                    return (
                        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                            <h1 className='tc'>{view}</h1>
                            <List content={db} filter={view} touchFunction={passKey}/>
                            <NewItemButton touchFunction={passTitle} />
                        </div>
                    )
                }
            } else {
                let itemType = '';
                const id = parseInt(itemID);
                for (let i=0; i<db.length; i++){

                    if (db[i].id === id){
                    itemType = db[i].type;
                    break;
                    }
                }
                switch(itemType) {
                    case PROJECT:
                        return (
                            <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                                <h1 className='tc'>Project</h1>
                                <ProjectDetails id={parseInt(itemID)} touchFunction={passKey} />
                                
                            </div>        
                        )
                    case TASK:
                        return (
                            <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                                <h1 className='tc'>Task</h1>
                                <TaskDetails id={parseInt(itemID)} touchFunction={passKey} />
                                
                            </div>        
                        )
                    case INBOX_ITEM:
                        return (
                            <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                                <h1 className='tc'>Inbox Item</h1>
                                <ItemDetails id={parseInt(itemID)} touchFunction={passKey} />
                                <NewItemButton touchFunction={passTitle} />
                            </div>        
                        )
                    default:
                        return (
                            <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
                                <h1 className='tc'>Error</h1>
                                <p>Item Not Found</p>
                                <NewItemButton touchFunction={passTitle} />
                            </div>        
                        )
                }
            }
        default:
            return (
                <div >
                    <div className='pb3'>
                        <StatsOverview touchFunction={passTitle} />
                    </div>
                    <div className="flex justify-center pb3 h-15">
                        <ProjectsOverview touchFunction={passTitle} />
                        <TaskOverview touchFunction={passTitle} />
                    </div>
                    <div className="flex justify-center pb3 h-15">
                        <InboxOverview touchFunction={passTitle}/>
                        <SkillsOverview touchFunction={passTitle}/>
                    </div>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8