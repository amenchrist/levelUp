import React from 'react';
import { connect } from 'react-redux';
import { selectView, selectItem, UpdateExp } from '../actions';
import { PROJECTS, STATS, TASKS, INBOX, NEW_ITEM, TASK, MISSION, TODAY, DAILY, REFERENCES } from '../constants';
import List from '../components/List';
import { InboxItems } from '../InboxItems';
import { TaskList } from '../TaskList';
import { ProjectList } from '../ProjectList';
import { ReferenceList } from '../ReferenceList';
import './Home.css';
import NewItemButton from '../components/NewItemButton';
import NewItem from '../components/NewItem';
import Details from './Details';
import Home from './Home';
import Stats from './Stats';


const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view,
        previousView: state.selectViewReducer.previousView,
        itemID: state.selectItemReducer.itemID,
        exp: state.UpdateExpReducer.exp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        },
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        }
    }
}



function Main(props) {
    
    const { view, itemID, onTouch, changeItemID, previousView, updateExp, exp } = props;
    
    let type;

    switch(previousView) {
        case TASKS:
            type = TASK;
        break;
        case PROJECTS:
            type = MISSION;
        break;
        default:
    }
    
    const db = InboxItems.concat(ProjectList, TaskList, ReferenceList);
    
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

    const views = [ NEW_ITEM, PROJECTS, TASKS, INBOX, TODAY, DAILY, REFERENCES ];

    switch( true) {
        case (view === STATS):
            return (
                <Stats />
            )
        case views.indexOf(view) !== -1 :
            if (itemID === "0" || itemID === 0) { // Imagine the id for list component = 0
                if (view === NEW_ITEM) {
                    return (
                        <div className='h-100 pa2'>
                            <div className=' h-10'>
                                <h5>EXP: {exp}</h5>
                            </div>
                            <div className='h-90'>
                                <NewItem submitFunction={passTitle} view={type} updateExp={updateExp} />
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className='h-100'>
                            <div className='h-10'>
                                <h5>EXP: {exp}</h5>
                            </div>
                            <div className='h-90 pa1'>
                                <div className='h-100 w-100 center pa1'>
                                    <h1 className='tc b gold ma0 pb2'>{view}</h1>
                                    <div className=' h-80 '>
                                        <List content={db} filter={view} touchFunction={passKey}/>
                                    </div>
                                    <div className='h-10 flex w-100 content-end pa2'>
                                        <NewItemButton touchFunction={passTitle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    )
                }
            } else {
                return (
                    <div className='h-100 pa2 '>
                            <div className='h-10'>
                                <h5>EXP: {exp}</h5>
                            </div>
                            <div className='h-90 pa1'>
                                <Details content={db} itemID={itemID} selectAnother={changeItemID} />
                            </div>
                        </div>
                )
            }
        default:
            return (
                <Home />
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8