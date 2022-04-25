import React from 'react';
import { connect } from 'react-redux';
import { selectItem, UpdateExp, selectTitle,ChangeNav, CreateAlert } from '../actions';
import { MISSIONS, STATS, TASKS, INBOX, TASK, MISSION, DAILY, REFERENCES, TODAY, NEW, SOMEDAY, CALENDAR, DETAILS, PROCESSED, TRASH, COMPLETED, EVENTS, LIST } from '../constants';
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
        }
    }
}

function Main(props) {

    const { state, title, view, itemID, changeItemID, previousView, updateExp, exp, db, record, changeNav, createAlert, alerts } = props;
    
    //console.log(alerts[0])
    //console.log(state.items)
    //console.log(alerts.length)
    //console.log("alerting")
    if (alerts.length > 0 ){
        //alert(alerts[0].message);
        //alert("Somehting to Alert")
    }
    let type;
    switch(previousView) {
        case TASKS:
            type = TASK;
        break;
        case MISSIONS:
            type = MISSION;
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
        let content;
        switch(title) {
            case TASKS:
                content = db.Tasks;
            break;
            case MISSIONS:
                content = db.Missions;
            break;
            case INBOX:
                content = db.Inbox;
            break;
            case CALENDAR:
                content = db.Tasks.concat(db.Events);
            break;
            case REFERENCES:
                content = db.References;
            break;
            case TODAY:
                content = db.Tasks;
            break;
            case DAILY:
                content = db.Tasks;
            break;
            case COMPLETED:
                content = db.Completed;
            break;
            case PROCESSED:
                content = db.Inbox;
            break;
            case SOMEDAY:
                content = db.Someday;
            break;
            case EVENTS:
                content = db.Events;
            break;
            case TRASH:
                // content = db.Trash;
                content = db.Inbox.concat(db.Tasks, db.Missions, db.Events, db.References)
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
                        <div className='h-10'>
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