import React from 'react';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { TASK, TASKS, PROJECTS, PROJECT, INBOX_ITEM, TODAY, DAILY, DONE, MISSION, REFERENCE, REFERENCES } from '../constants';

export default function List({ touchFunction, content, filter }) {
    //console.log(content);

    // A Mission's Tasklist
    const missionTasks = content.map((entry,i ) => {
        return <ListItem item={content[i]} touchFunction={touchFunction} key={content[i].id}/>
    })

    // Today's Mission
    const dueToday = content.filter((entry) => ( 
        ( entry.dueDate === new Date().toISOString().substr(0, 10) ) && entry.status !== DONE ) );
    const todaysTasks = dueToday.map((entry,i ) => {
        return <ListItem item={dueToday[i]} touchFunction={touchFunction} key={content[i].id}/>
    })
    /////

    // Daily exercises
    const dailyEx = content.filter((entry) => (entry.frequency === DAILY ));
    const dailyTasks = dailyEx.map((entry, i) => {
        return <ListItem item={dailyEx[i]} touchFunction={touchFunction} key={content[i].id}/>
    })
    ///////

    // Project, Task, Inbox and Reference Lists 
    let type = '';
    switch(filter){
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
        return <ListItem item={filteredContent[i]} touchFunction={touchFunction} key={content[i].id}/>
    })

    ////////////////////////////////



    switch(filter){
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
        case MISSION:
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