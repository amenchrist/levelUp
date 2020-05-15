import React from 'react';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { TASK, TASKS, PROJECTS, PROJECT, INBOX_ITEM } from '../constants';

export default function List({ touchFunction, content, filter }) {

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
    console.log(filteredContent);
    const ListItems = filteredContent.map((entry,i) => {
        return <ListItem item={filteredContent[i]} touchFunction={touchFunction} key={content[i].id}/>
    })
    return (
        <Scroll>
            {ListItems}
        </Scroll>
    )
}