import React from 'react';
import { connect } from 'react-redux';
import StatsOverview from '../components/StatsOverview';
import TaskOverview from '../components/TasksOverview';
import ProjectsOverview from '../components/ProjectsOverview';
import InboxOverview from '../components/InboxOverview';
import { selectTitle, selectView, selectItem } from '../actions';
import { INBOX, INBOX_ITEM, UNPROCESSED, DAILY } from '../constants';
import './Home.css';
import NewItemTile from '../components/NewItemTile';
import TodaysMission from '../components/TodaysMission';
import { passTitle } from '../functions';


const mapStateToProps = state => {
    return {
        view: state.values.view,
        title: state.values.title,
        itemID: state.values.itemID,
        exp: state.UpdateExpReducer.exp,
        db: state.items.record.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTitle: (title) => {
            return dispatch(selectTitle(title))
        },
        changeView: (view) => {
            return dispatch(selectView(view))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

function Home(props) {
    
    const { changeTitle, changeView, changeItemID, exp, db } = props;

    function selectItem(){
    
        for (let i=0; i<db.length; i++){
            if (db[i].type === INBOX_ITEM && db[i].status === UNPROCESSED) {
                changeItemID(db[i].id);
                changeView(INBOX)
                break;
            } else {
                changeItemID(0);
                changeView(INBOX)
            }
        }
    }

    function handleEvent(e){
        passTitle(e, changeTitle);
    }

    return (
        <div className='h-100 pa1' >
            <div className='pa1 ph1 h-40'>
                <StatsOverview touchFunction={handleEvent} exp={exp} />
            </div>
            <div className="flex justify-center h-20 ">
                <div className='w-50 pa1'>
                    <ProjectsOverview touchFunction={handleEvent} projects={db.Projects} />
                </div>
                <div className='w-50 pa1'>
                    <TaskOverview touchFunction={handleEvent} tasks={db.Tasks}/>
                </div>
            </div>
            <div className='flex w-100 h-10 pa1'>
                <NewItemTile touchFunction={handleEvent} />
            </div>
            <div className="flex justify-center h-30">
                <div className=' w-50 h-100 pa1'>
                   <TodaysMission touchFunction={handleEvent} gotoItem={changeItemID} />
                </div>
                <div className=' w-50 h-100'>
                    <div className=' w-100 h-50'>
                        <div className=' h-50 pa1'>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white ' title={DAILY} onClick={handleEvent} >
                                <h4 className='tc'>Daily Exercises</h4>
                            </div>
                        </div>
                        <div className='h-50 pa1'>
                            <div className='flex items-center justify-center h-100 w-100 center bg-white 'title='REFERENCES' onClick={handleEvent}>
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
                            <InboxOverview touchFunction={handleEvent} inbox={db.Inbox}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);