import React from 'react';
import { connect } from 'react-redux';
import StatsOverview from '../components/StatsOverview';
import TaskOverview from '../components/TasksOverview';
import ProjectsOverview from '../components/ProjectsOverview';
import InboxOverview from '../components/InboxOverview';
//import SkillsOverview from '../components/SkillsOverview';
import { selectView, selectItem } from '../actions';
import { INBOX, INBOX_ITEM, UNPROCESSED, DAILY } from '../constants';
//import { db } from '../db';
import './Home.css';
import NewItemTile from '../components/NewItemTile';
import TodaysMission from '../components/TodaysMission';
// import DailyEx from '../components/DailyEx';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp,
        db: state.RetrieveDBReducer.db
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
    
    const { onTouch, changeItemID, exp, db } = props;

    function selectItem(){
    
        for (let i=0; i<db.length; i++){
            if (db[i].type === INBOX_ITEM && db[i].status === UNPROCESSED) {
                changeItemID(db[i].id);
                onTouch(INBOX)
                break;
            } else {
                changeItemID(0);
                onTouch(INBOX)
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
    return (
        <div className='h-100 pa1' >
            <div className='pa1 ph1 h-40'>
                <StatsOverview touchFunction={passTitle} exp={exp} />
            </div>
            <div className="flex justify-center h-20 ">
                <div className='w-50 pa1'>
                    <ProjectsOverview touchFunction={passTitle} projects={db.Projects} />
                </div>
                <div className='w-50 pa1'>
                    <TaskOverview touchFunction={passTitle} tasks={db.Tasks}/>
                </div>
            </div>
            <div className='flex w-100 h-10 pa1'>
                <NewItemTile touchFunction={passTitle} />
            </div>
            <div className="flex justify-center h-30">
                <div className=' w-50 h-100 pa1'>
                   <TodaysMission touchFunction={passTitle} gotoItem={changeItemID} />
                </div>
                <div className=' w-50 h-100'>
                    <div className=' w-100 h-50'>
                        <div className=' h-50 pa1'>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white ' title={DAILY} onClick={passTitle} >
                                <h4 className='tc'>Daily Exercises</h4>
                            </div>
                        </div>
                        <div className='h-50 pa1'>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white 'title='REFERENCES' onClick={passTitle}>
                                <h4 className='tc'>References</h4>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 h-50 flex'>
                        <div className='w-50 h-100 pa1' onClick={selectItem}>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white pa1'>
                                <h4 className='tc'>Process<br />Inbox</h4>
                            </div>
                        </div>
                        <div className='w-50 h-100 pa1'>
                            <InboxOverview touchFunction={passTitle}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8