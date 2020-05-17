import React from 'react';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { TASK, TASKS, PROJECTS, PROJECT, INBOX_ITEM, TODAY, DAILY } from '../constants';

export default function List({ touchFunction, content, filter }) {

    
    const dueToday = content.filter((entry) => ( entry.dueDate === new Date().toISOString().substr(0, 10) ));

    const todaysTasks = dueToday.map((entry,i ) => {
        return <ListItem item={dueToday[i]} touchFunction={touchFunction} key={content[i].id}/>
    })

    const dailyEx = content.filter((entry) => (entry.frequency === DAILY ));
    const dailyTasks = dailyEx.map((entry, i) => {
        return <ListItem item={dailyEx[i]} touchFunction={touchFunction} key={content[i].id}/>
    })

    let type = '';
    switch(filter){
        case TASKS:
            type = TASK;
        break;
        case PROJECTS:
            type = PROJECT;
            break;
        default:
            type = INBOX_ITEM;
    }

    const filteredContent = content.filter((entry) => (entry.type === type))

    const ListItems = filteredContent.map((entry,i) => {
        return <ListItem item={filteredContent[i]} touchFunction={touchFunction} key={content[i].id}/>
    })

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
        default:
            return (
                <Scroll>
                    {ListItems}
                </Scroll>
            );
    }
}