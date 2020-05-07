import React from 'react';
import ListItem from './ListItem';
import Scroll from './Scroll';

export default function List({ touchFunction, content }) {
    const ListItems = content.map((entry,i) => {
        return <ListItem item={content[i]} touchFunction={touchFunction} key={content[i].id}/>
    })
    return (
        <Scroll>
            {ListItems}
        </Scroll>
    )
}