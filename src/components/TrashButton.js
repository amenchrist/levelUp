import React from 'react';
import { connect } from 'react-redux';
import { ShipItems, ChangeNav } from '../actions';
import trashCan from '../assets/trash1600.png';
import { INBOX, PROJECTS, REMOVE, TASKS, REFERENCES, SOMEDAY, ADD, PROCESSED, COMPLETED, MISSION_TASKS } from '../constants';

const mapStateToProps = state => {
    return {
        title: state.values.title,
        view: state.values.view,
        ID: state.values.itemID,
        db: state.items.record.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        shipItems: (items, agent, record) => {
            return dispatch(ShipItems(items, agent, record))
        },
        changeNav: (navObj) => {
            return dispatch(ChangeNav(navObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashButton);


function TrashButton({ shipItems, changeNav, db, title, ID }) {

    const InboxItems = db.Inbox;
    const ProjectList = db.Projects;
    const TaskList = db.Tasks;
    const References = db.References;
    const SomedayList = db.Someday;
    const ProcessedList = db.Process;
    const Completed = db.Completed;
    const Trash = db.Trash;

    

    let currentlist, indx, currentItem;

    switch(title) {
        case PROJECTS:
            currentlist = ProjectList;
        break;
        case TASKS:
            currentlist = TaskList;
        break;
        case INBOX:
            currentlist = InboxItems;
        break;
        case REFERENCES:
            currentlist = References;
        break;
        case SOMEDAY:
            currentlist = SomedayList;
        break;
        case PROCESSED:
            currentlist = ProcessedList;
        break;
        case COMPLETED:
            currentlist = Completed;
        break;
        case MISSION_TASKS:
            currentlist = TaskList;
        break;
        default:
    }

    for (let i=0; i<currentlist.length; i++){

        if (currentlist[i].id === parseInt(ID)){
            currentItem = currentlist[i];
            indx = i;
            break;
        }

    }


    function pushChanges(action, item, list){
        let state = {
            action: action,
            list: list,
            item: item,
            pushDate: (new Date()).getTime()
        }
        shipItems(state);
    }

    function ammendList(action, list, item, itemndx){
        let dbList;
        switch (list) {
            case ProjectList:
                dbList = "Projects"
            break;
            case InboxItems:
                dbList = "Inbox"
            break;
            case REFERENCES:
                dbList = "References"
            break;
            case TaskList:
                dbList = "Tasks"
            break;
            case SOMEDAY:
                dbList = "Someday"
            break;
            case Trash:
                dbList = "Trash"
            break;
            default:
        }
        switch (action) {
            case REMOVE:
                list.splice(itemndx, 1);
                pushChanges(REMOVE, item, dbList);
            break;
            case ADD:
                list.unshift(item);
                pushChanges(ADD, item, dbList);
            break;
            default:
        }
    }

    //Change Nav to List
    const nav = {
        title: title,
        view: "LIST",
        ID: 0
    }

    function deleteItem() {
        console.log('delete button clicked');
        currentItem.isTrashed = true;
        currentItem.trashedDate = new Date().getTime();
        ammendList(ADD, Trash, currentItem, indx);
        ammendList(REMOVE, currentlist, currentItem, indx);
        changeNav(nav);
    }


    return (
        <div>
            <img src={trashCan} alt='trash icon' className='h2' onClick={() => {deleteItem()}} />
        </div>
    )
}