import React from 'react';
import { connect } from 'react-redux';
import { selectItem, ChangeNav } from '../actions';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { TASK, TASKS, PROJECTS, PROJECT, INBOX_ITEM, TODAY, DAILY, DONE, REFERENCE, REFERENCES, COMPLETED, INBOX, ASAP } from '../constants';
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



/////////////////////////////////////////////////


function List({ content, changeItemID, title, state, changeNav }) {

    //console.log("first contetn: ", content)
    function handleEvent(e ) {
        setNavValues(e, changeNav, state);
    }

    let missionTasks, dueToday, todaysTasks, dailyEx, dailyTasks;
    

    
    // Project, Task, Inbox and Reference Lists 
    let type = '';
    let status;
    let filteredContent = []
    switch(title){
        case TASKS:
            type = TASK;
            filteredContent = content
        break;
        case PROJECTS:
            type = PROJECT;
            filteredContent = content.filter((entry) => (entry.type === type));
            // A Mission's Tasklist
            missionTasks = content.map((entry,i ) => {
                return <ListItem item={content[i]} touchFunction={handleEvent} key={content[i].id}/>
            })
        break;
        case TODAY:
            type = TASK;
            filteredContent = content.filter((entry) => (entry.type === type));

            // Today's Mission
            dueToday = content.filter((entry) => ( 
                (entry.dueDate != ASAP) && ( new Date(entry.dueDate).toISOString().substr(0, 10) === new Date().toISOString().substr(0, 10) ) && entry.status !== DONE ) );
            
                const todaysTasks = dueToday.map((entry,i ) => {
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
        case REFERENCES:
            type = REFERENCE;
            filteredContent = content.filter((entry) => (entry.type === type));
        break;
        case COMPLETED:
            status = DONE;
            filteredContent = content.filter((entry) => (entry.status === status));
        break;
        case INBOX:
            type = INBOX_ITEM;
            filteredContent = content.filter((entry) => (entry.type === type));
        break;
        default:
            filteredContent = content;
    }

    //console.log("filtered COntent: ", filteredContent);
    //console.log("COntent: ", content);
     

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
        case PROJECTS:
            return (
                <Scroll>
                    {missionTasks}
                </Scroll>
            )
        default:
            return (
                <Scroll>
                    {ListItems}
                </Scroll>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

