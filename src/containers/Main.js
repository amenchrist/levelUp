import React from 'react';
import { connect } from 'react-redux';
import { selectItem, UpdateExp, selectTitle,ChangeNav } from '../actions';
import { PROJECTS, STATS, TASKS, INBOX, TASK, MISSION, DAILY, REFERENCES, TODAY, NEW, SOMEDAY, CALENDAR, DETAILS, PROCESSED, TRASH, COMPLETED, REMINDERS, LIST } from '../constants';
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
        state: state.values
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
        })
    }
}

function Main(props) {

    const { state, title, view, itemID, changeItemID, previousView, updateExp, exp, db, record, changeNav } = props;
    
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

    function handleEvent(e){
        setNavValues(e, changeNav, state);
    }

    console.log('Title: ', title)
    console.log('Item ID: ', itemID)
    console.log('View: ', view)

    if(record.isFetching){
        return <div className="f5 fw4 white">Loading...</div>;
    } else {

        let content;
        switch(title) {
            case TASKS:
                content = db.Tasks;
            break;
            case PROJECTS:
                content = db.Projects;
            break;
            case INBOX:
                content = db.Inbox;
            break;
            case TODAY:
                content = db.Tasks;
            break;
            case DAILY:
                content = db.Tasks;
            break;
            case CALENDAR:
                content = db.Tasks.concat(db.Reminders);
            break;
            case COMPLETED:
                content = db.Completed;
            break;
            case PROCESSED:
                content = db.Processed;
            break;
            case REFERENCES:
                content = db.References;
            break;
            case SOMEDAY:
                content = db.Someday;
            break;
            case REMINDERS:
                content = db.Reminders;
            break;
            case TRASH:
                content = db.Trash;
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
                            <Details selectAnother={changeItemID} />
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
                    <Home />
                );
        }
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);