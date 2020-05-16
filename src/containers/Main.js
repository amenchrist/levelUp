import React from 'react';
import { connect } from 'react-redux';
import { selectView, selectItem } from '../actions';
import { PROJECTS, STATS, TASKS, INBOX, NEW_ITEM, TASK, MISSION } from '../constants';
import List from '../components/List';
import { InboxItems } from '../InboxItems';
import { TaskList } from '../TaskList';
import { ProjectList } from '../ProjectList'
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



function Main(props) {
    
    const { view, itemID, onTouch, changeItemID, previousView } = props;
    
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
    
    const db = InboxItems.concat(ProjectList, TaskList);
    
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

    const views = [ NEW_ITEM, PROJECTS, TASKS, INBOX ];

    switch( true) {
        case (view === STATS):
            return (
                <Stats />
            )
        case views.indexOf(view) !== -1 :
            if (itemID === "0" || itemID === 0) { // Imagine the id for list component = 0
                if (view === NEW_ITEM) {
                    return (
                        <div className='h-100 pa1'>
                            <div className='show h-10'>
                                <h6>EXP: 205</h6>
                            </div>
                            <div className='h-90'>
                                <NewItem submitFunction={passTitle} view={type} />
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className='h-100 lightup'>
                            <div className='show h-10'>
                                <h6>EXP: 205</h6>
                            </div>
                            <div className='h-90 pa1'>
                                <div className='h-100 w-100 center br1 ba b--black-10 pa1'>
                                    <h1 className='tc'>{view}</h1>
                                    <div className=' h-70 '>
                                        <List content={db} filter={view} touchFunction={passKey}/>
                                    </div>
                                    <div className='flex justify-center pt2'>
                                        <NewItemButton touchFunction={passTitle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    )
                }
            } else {
                return (
                    <div className='h-100 pa1'>
                            <div className='show h-10'>
                                <h6>EXP: 205</h6>
                            </div>
                            <div className='h-90 pa1'>
                                <Details content={db} itemID={itemID} touchFunction={passKey} />
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