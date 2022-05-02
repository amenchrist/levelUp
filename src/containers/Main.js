import React from 'react';
import { connect } from 'react-redux';
import { selectItem, UpdateExp, selectTitle,ChangeNav, CreateAlert, SetActiveTask } from '../actions';
import { MISSIONS, STATS, TASKS, INBOX, TASK, MISSION, DAILY, REFERENCES, TODAY, NEW, SOMEDAY, CALENDAR, DETAILS, PROCESSED, TRASH, COMPLETED, EVENTS, LIST, ACTIVE, DONE, ASAP, EVENT } from '../constants';
import List from '../components/List';
import './Home.css';
import NewItemButton from '../components/NewItemButton';
import NewItem from '../components/NewItem';
import Details from './Details';
import Home from './Home';
import Stats from './Stats';
import { setNavValues } from '../functions';


const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        itemID: state.values.itemID,
        previousView: state.values.previousView,
        exp: state.UpdateExpReducer.exp,
        recordState: state.items.record.isFetching,
        db: state.items.record.items,
        record: state.items.record,
        state: state.values,
        alerts: state.items.alerts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        changeTitle: (title) => {
            return dispatch(selectTitle(title))
        },
        updateExp: (exp) => {
            return dispatch(UpdateExp(exp))
        },
        changeNav: (navObj => {
            return dispatch(ChangeNav(navObj))
        }),
        createAlert: (msg) => {
            return dispatch(CreateAlert(msg))
        },
        setActiveTask: (task) => {
            return dispatch(SetActiveTask(task))
        },
    }
}

function Main(props) {

    const { 
        state, title, view, itemID, changeItemID, previousView, 
        updateExp, exp, db, record, changeNav, createAlert, alerts, setActiveTask } = props;
    
    
    //console.log("state from Main: ", state)
    //console.log(state.items)
    //console.log(alerts.length)
    //console.log("alerting")
    if (alerts.length > 0 ){
        //alert(alerts[0].message);
        //alert("Something to Alert")
    }
    let type;
    switch(previousView) {
        case TASKS:
            type = TASK;
        break;
        case MISSIONS:
            type = MISSION;
        break;
        case CALENDAR:
            type = EVENT;
        break;
        default:
    } 

    function handleEvent(e){
        setNavValues(e, changeNav, state);
    }

    console.log('Title: ', title)
    console.log('Item ID: ', itemID)
    console.log('View: ', view)

    

    if(record.isFetching){
        return <div className="f5 fw4 white">Loading...</div>;
    } else {
        console.log(db)
        //STATS OVERVIEW TIMER TRIGGER ON REFRESH
        let activeTasks = db.Tasks.filter((entry) => entry.status === ACTIVE);
        //console.log("Active Task from Main: ", activeTasks);
        if (activeTasks.length > 0){
            setActiveTask(activeTasks[0])
        }

        //Distribute Content
        let content, unsortedContent;
        switch(title) {
            case TASKS:
                unsortedContent = db.Tasks.filter( e => e.isTrashed === false && e.status !== DONE && e.dueDate !== SOMEDAY);
                content = unsortedContent.sort((a,b) => a.order - b.order)
            break;
            case MISSIONS:
                content = db.Missions.filter( e => e.isTrashed === false && e.status !== DONE && e.dueDate !== SOMEDAY);
            break;
            case INBOX:
                content = db.Inbox.filter((entry) => entry.isTrashed === false && entry.status !== PROCESSED );
            break;
            case CALENDAR:
                content = db.Tasks.filter( e => e.isTrashed === false && e.status !== DONE && (e.dueDate !== ASAP && e.dueDate !== SOMEDAY)).concat(db.Events);
            break;
            case REFERENCES:
                content = db.References.filter( e => e.isTrashed === false);
            break;
            case TODAY:
                content = db.Tasks.filter( e => e.isTrashed === false && e.status !== DONE);
            break;
            case DAILY:
                content = db.Tasks.filter( e => e.isTrashed === false && e.status !== DONE);
            break;
            case COMPLETED:
                content = db.Tasks.concat(db.Missions).filter( e => e.isTrashed === false && e.status === DONE);
            break;
            case PROCESSED:
                content = db.Inbox.filter( e => e.isTrashed === false && e.status === PROCESSED);
            break;
            case SOMEDAY:
                content = db.Tasks.concat(db.Missions).filter( e => e.isTrashed === false && e.dueDate === SOMEDAY );
            break;
            case EVENTS:
                content = db.Events.filter( e => e.isTrashed === false);
            break;
            case TRASH:
                // content = db.Trash;
                content = db.Inbox.concat(db.Tasks, db.Missions, db.Events, db.References)//.filter( e => e.isTrashed === true)
            break;
            default:
                content = []
        } 

        switch( true ) {
            case (title === STATS):
                return (
                    <Stats />
                )
            case view === DETAILS && itemID !== 0:
                return (
                    <div className='h-100 pa2 '>
                        <div className='h-10 ba b--black-10'>
                            <h5 className='fw3 white'>EXP: {exp}</h5>
                        </div>
                        <div className='h-90 pa1'>
                            <Details content={content} db={db} selectAnother={changeItemID} />
                        </div>
                    </div>
                )
            case view === LIST && parseInt(itemID) === 0:
                return (
                    <div className='h-100 pa2'>
                        <div className='h-10'>
                            <h5 className='fw3 white'>EXP: {exp}</h5>
                        </div>
                        <div className='h-90 pa1'>
                            <div className='h-100 w-100 center pa1'>
                                <h1 className='tc b gold ma0 pb2'>{title}</h1>
                                <div className=' h-80 '>
                                    <List content={content} />
                                </div>
                                <div className='h-10 flex w-100 content-end pa2'>
                                    <NewItemButton touchFunction={handleEvent} />
                                </div>
                            </div>
                        </div>
                    </div>   
                )
            case view === NEW:
                console.log("type: ", type)
                return (
                    <div className='h-100 pa2'>
                        <div className=' h-10'>
                            <h5 className='fw3 white'>EXP: {exp}</h5>
                        </div>
                        <div className='h-90'>
                            <NewItem submitFunction={""} view={type} updateExp={updateExp} />
                        </div>
                    </div>
                )
            default:
                return (
                    <Home db={db} />
                );
        }
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);