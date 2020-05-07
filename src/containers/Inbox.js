import React from 'react';
import { InboxItems } from '../InboxItems';
import List from '../components/List';

export default function Inbox() {
    return (
        <div className='h-100 w-100 center br1 pa3 ba b--black-10'>
            <h1 className='tc'>Inbox</h1>
            <List content={InboxItems}/>
        </div>   
    )
}