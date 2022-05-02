import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectItem, ChangeNav } from '../actions';
import ListItem from './ListItem';
import Scroll from './Scroll';
import { TASK, TASKS, MISSIONS, MISSION, INBOX_ITEM, TODAY, DAILY, DONE, REFERENCE, REFERENCES, COMPLETED, INBOX, ASAP, CALENDAR, TRASH, EVENT, PROCESSED, SOMEDAY, DETAILS } from '../constants';
import { setNavValues  } from '../functions';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        itemID: state.values.itemID,
        db: state.items.record.items,
        state: state.values,
        view: state.values.view
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

function List({ content, changeItemID, title, view, state, changeNav }) {

    //console.log("first content: ", content)
    function handleEvent(e) {
        setNavValues(e, changeNav, state);
    }

    let missionTasks, dueToday, todaysTasks, dailyEx, dailyTasks;
    
    

    // useEffect(() => {
    //     setSort(false)
    // }) 
    
    


    // Mission, Task, Inbox, Event and Reference Lists 
    let type = '';
    let status;
    let filteredContent = []
    //console.log("content ", content);
    switch(title){
        case INBOX:
            filteredContent = content.filter((entry) => (entry.type === INBOX_ITEM && entry.isTrashed === false) && entry.status !== PROCESSED );
        break;
        case TRASH:
            filteredContent = content.filter((entry) => (entry.isTrashed === true));
        break;
        case TODAY:
            type = TASK;
            filteredContent = content.filter((entry) => ((entry.type === type) && (entry.dueDate !== ASAP) && ( entry.dueDate === new Date().toISOString().substr(0, 10) ) && entry.status !== DONE ));
        break;
        case DAILY:
            type = TASK;
            // Daily exercises
            filteredContent = content.filter((entry) => (entry.type === type && entry.frequency === DAILY ) && (entry.isTrashed === false));
            // console.log("filtered content", filteredContent)
            // dailyTasks = filteredContent.map((entry, i) => {
            //     return <ListItem item={filteredContent[i]} touchFunction={handleEvent} key={content[i].id}/>
            // })
        break;
        default:
            filteredContent = content.filter((entry) => (entry.isTrashed === false));
    }

    const listItems = filteredContent.map((entry,i) => {
        return <ListItem item={filteredContent[i]} touchFunction={handleEvent} key={content[i].id}/>
    })

    const [ sortedContent, setSortedContent ] = useState(filteredContent);
    const [ sort, setSort ] = useState(false);

    function swapOrder(list, i, direction){
        console.log("changing order")
        if (direction === "UP" && list[i].order !== 0){
            console.log(list[i])
            list[i-1].order++;
            list[i].order--;
        } else if (direction === "DOWN" && list[i].order !== list.length - 1){
            console.log(list[i])
            list[i+1].order--;
            list[i].order++;
        }
        filteredContent = filteredContent.sort((a,b) => a.order - b.order)
        setSortedContent(filteredContent)
    }

    // useEffect(() => {
    //     setSortedContent(filteredContent);
    // })


    switch(title){
        // case TODAY:
        //     return (
        //         <Scroll>
        //             {todaysTasks}
        //         </Scroll>
        //     )
        // case DAILY:
        //     return (
        //         <Scroll>
        //             {dailyTasks}
        //         </Scroll>
        //     )
        case MISSIONS:
            if (view === DETAILS){
                if (sort === true){
                    return (
                        <div>
                            <button className='pb2' onClick={()=>{setSort(false)}}>SAVE ORDER</button>
                            <Scroll>
                                {filteredContent.map((entry,i) => {
                                    return (
                                        <div className='pb2'>
                                            <p className='white fw7 b tc' onClick={()=> swapOrder(sortedContent, i, "UP") }>^</p>
                                            <ListItem item={sortedContent[i]} touchFunction={handleEvent} key={sortedContent[i].id}/>
                                            <p className='white fw5 tc' onClick={()=> swapOrder(sortedContent, i, "DOWN") }>v</p>
                                        </div>
                                    )
                                })}
                            </Scroll>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <button className='pb2' onClick={()=>{setSort(true)}}>CHANGE ORDER</button>
                            <Scroll>
                                {listItems}
                            </Scroll>
                        </div>
                    )
                }
            } else {
                return (
                    <div>
                        <Scroll>
                            {listItems}
                        </Scroll>
                    </div>
                )
            }
        default:
            return (
                <Scroll>
                    {listItems}
                </Scroll>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

