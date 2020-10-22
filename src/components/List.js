import React from 'react';
import { connect } from 'react-redux';
import { selectItem } from '../actions';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { TASK, TASKS, PROJECTS, PROJECT, INBOX_ITEM, TODAY, DAILY, DONE, REFERENCE, REFERENCES } from '../constants';
//import { passKey } from '../functions';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        itemID: state.values.itemID,
        db: state.items.record.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeItemID: (id) => {
            return dispatch(selectItem(id))
        }
    }
}

function List({ content, changeItemID, title }) {
    console.log(content)

    function passKey(e, changeIDFunction) {
        //Takes the events target and checks for title attribute 
        //If no title attribute, check parent node for title attribute
        //If not found, repeat step 2
        let targ = e.target;
        checkForID(targ);
        function checkForID (t) {
            if (t.id) {
                changeIDFunction(t.id);
            } else {
                t = t.parentNode;
                checkForID (t);   
            }
        }
    }

    function handleEvent(e ) {
        passKey(e, changeItemID);
    }
    // let content = [];
    // switch ( title ) {
    //     case 'PROJECTS':
    //         content = db.Projects;
    //         console.log('List content: ', content)
    //         break;
    //     case 'TASKS':
    //         content = db.Tasks;
    //         break;
    //     case 'DUE_TODAY':
    //         content = db.Tasks;
    //         break;
    //     default:
    //         content = db.Inbox;
    // }
    //console.log(content);

    // A Mission's Tasklist
    const missionTasks = content.map((entry,i ) => {
        return <ListItem item={content[i]} touchFunction={handleEvent} key={content[i].id}/>
    })

    // Today's Mission
    const dueToday = content.filter((entry) => ( 
        ( entry.dueDate === new Date().toISOString().substr(0, 10) ) && entry.status !== DONE ) );
    const todaysTasks = dueToday.map((entry,i ) => {
        return <ListItem item={dueToday[i]} touchFunction={handleEvent} key={content[i].id}/>
    })
    /////

    // Daily exercises
    const dailyEx = content.filter((entry) => (entry.frequency === DAILY ));
    const dailyTasks = dailyEx.map((entry, i) => {
        return <ListItem item={dailyEx[i]} touchFunction={handleEvent} key={content[i].id}/>
    })
    ///////

    // Project, Task, Inbox and Reference Lists 
    let type = '';
    switch(title){
        case TASKS:
            type = TASK;
        break;
        case PROJECTS:
            type = PROJECT;
            break;
        case REFERENCES:
            type = REFERENCE;
            break;
        default:
            type = INBOX_ITEM;
    }

    const filteredContent = content.filter((entry) => (entry.type === type))

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

