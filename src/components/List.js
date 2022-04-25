import React from 'react';
import { connect } from 'react-redux';
import { selectItem, ChangeNav } from '../actions';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { TASK, TASKS, MISSIONS, MISSION, INBOX_ITEM, TODAY, DAILY, DONE, REFERENCE, REFERENCES, COMPLETED, INBOX, ASAP, CALENDAR, TRASH, EVENT, PROCESSED } from '../constants';
import { setNavValues  } from '../functions';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        itemID: state.values.itemID,
        db: state.items.record.items,
        state: state.values
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

function List({ content, changeItemID, title, state, changeNav }) {

    //console.log("first content: ", content)
    function handleEvent(e) {
        setNavValues(e, changeNav, state);
    }

    let missionTasks, dueToday, todaysTasks, dailyEx, dailyTasks;
    

    
    // Mission, Task, Inbox, Event and Reference Lists 
    let type = '';
    let status;
    let filteredContent = []
    switch(title){
        case INBOX:
            filteredContent = content.filter((entry) => (entry.type === INBOX_ITEM && entry.isTrashed === false) && entry.status !== PROCESSED );
        break;
        case TASKS:
            type = TASK;
            filteredContent = content.filter((entry) => (entry.isTrashed === false));
        break;
        case MISSIONS:
            filteredContent = content.filter((entry) => (entry.isTrashed === false));
        break;
        case CALENDAR:
            filteredContent = content.filter((entry) => (entry.dueDate !== ASAP && entry.isTrashed === false) && entry.type === EVENT);
        break;
        case REFERENCES:
            filteredContent = content.filter((entry) => (entry.type === REFERENCE && entry.isTrashed === false));
        break;
        case COMPLETED:
            filteredContent = content.filter((entry) => (entry.status === DONE && entry.isTrashed === false));
        break;
        case TRASH:
            filteredContent = content.filter((entry) => (entry.isTrashed === true));
        break;
        case PROCESSED:
            filteredContent = content.filter((entry) => (entry.status === PROCESSED));
        break;
        case TODAY:
            type = TASK;
            filteredContent = content.filter((entry) => (entry.type === type));

            // Today's Mission
            dueToday = content.filter((entry) => ( 
                ((entry.dueDate != ASAP) && ( new Date(entry.dueDate).toISOString().substr(0, 10) === new Date().toISOString().substr(0, 10) )) && entry.status !== DONE ) );
            
            todaysTasks = dueToday.map((entry,i ) => {
                return <ListItem item={dueToday[i]} touchFunction={handleEvent} key={content[i].id}/>
            })
        break;
        case DAILY:
            type = TASK;
            filteredContent = content.filter((entry) => (entry.type === type));
            // Daily exercises
            dailyEx = content.filter((entry) => (entry.frequency === DAILY ));
            dailyTasks = dailyEx.map((entry, i) => {
                return <ListItem item={dailyEx[i]} touchFunction={handleEvent} key={content[i].id}/>
            })
        break;
        default:
            filteredContent = content.filter((entry) => (entry.isTrashed === false));
    }

    const ListItems = filteredContent.map((entry,i) => {
        return <ListItem item={filteredContent[i]} touchFunction={handleEvent} key={content[i].id}/>
    })


    switch(title){
        case TODAY:
            return (
                <Scroll>
                    {todaysTasks}
                </Scroll>
            )
        case DAILY:
            return (
                <Scroll>
                    {dailyTasks}
                </Scroll>
            )
        // case MISSIONS:
        //     return (
        //         <Scroll>
        //             {missionTasks}
        //         </Scroll>
        //     )
        default:
            return (
                <Scroll>
                    {ListItems}
                </Scroll>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

