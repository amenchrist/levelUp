/// For all the extra functions required in multiple places

import { ShipItems } from "./actions";
import { ADD, ASAP, COMPLETED, INBOX, PROCESSED, PROJECTS, REFERENCES, REMINDERS, REMOVE, SOMEDAY, TASKS, TRASH, UPDATE } from "./constants";



export function passTitleAndID(e, ChangeTitleFunction, changeIDFunction) {
    let targ = e.target;
    checkForTitle(targ)
    function checkForTitle (t) {
        if (t.title) {
            ChangeTitleFunction(t.title);
        } else {
            t = t.parentNode;
            checkForTitle (t);   
        }
    }
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

export function setNavValues(e, navChanger, state){
    let targ = e.target;
    let navTitle;
    checkForTitle(targ);
    function checkForTitle (t) {
        if (t.title) {
            navTitle = t.title;
        } else {
            t = t.parentNode;
            checkForTitle (t);   
        }
    }
    let navID;
    checkForID(targ);
    function checkForID (t) {
        if (t.id) {
            navID = t.id;
        } else {
            t = t.parentNode;
            checkForID (t);   
        }
    }
    let navView;
    checkForView(targ);
    function checkForView (t) {
        //console.log("target name: ", t.tagName)
        if (t.getAttribute('data-view')) {
            navView = t.getAttribute('data-view');
        } else {
            t = t.parentNode;
            checkForView (t);   
        }
    }
   
    !(parseInt(navID) >= 0) ? navID = 0 : console.log("");

    const nav = {
        title: navTitle,
        view: navView,
        ID: navID
    }
    console.log(nav)
    navChanger(nav);
}

export function calculateTime(timeSpent){

    //CALCULATE TIME SPENT
    console.log("timespent from calcTime: ", timeSpent)
    let s = timeSpent;
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let seconds = s % 60;
    s = (s - seconds) / 60;
    let minutes = s % 60;
    let hours = (s - minutes) / 60;
    return `${hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
    ${minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:
    ${seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})}` 
}


export function convertDateToMilliseconds(d) {
    let m,y;
    [y, m, d] = d.split("-"); //Split the string
     ;
     return new Date(...[y, m - 1, d]).getTime() //Return as an array with y,m,d sequence
  }


export function displayDays(dueDate){
    if (dueDate === ASAP) {
        return ASAP;
    } else {
        let days = Math.ceil((dueDate - new Date().getTime()) / (1000*60*60*24));
        switch(true){
            case days <= -1:
                return `${Math.abs(days)} days ago`;
            case days > 1:
                return `${days} days `;
            case days === 1:
                return `${days} day `;
            case Math.abs(days) === 0:
                return `TODAY `;
            default:
                return `${days} days `;
        }
    }
}

export function pushChanges(action, item, list, shippingFunction, exp){
    let state = {
        action: action,
        list: list,
        item: item,
        pushDate: (new Date()).getTime(),
        exp: exp
    }
    shippingFunction(state);
}


export function ammendList(db, list, item, action, shippingFunction, expObj){
    // lists = [ PROJECTS, TASKS, INBOX, REFERENCES, REMINDERS, SOMEDAY, COMPLETED, PROCESSED, TRASH ]
    
    let dbList;
    switch (list) {
        case PROJECTS:
            dbList = "Projects"
        break;
        case INBOX:
            dbList = "Inbox"
        break;
        case REFERENCES:
            dbList = "References"
        break;
        case REMINDERS:
            dbList = "Reminders"
        break;
        case TASKS:
            dbList = "Tasks"
        break;
        case SOMEDAY:
            dbList = "Someday"
        break;
        case PROCESSED:
            dbList = "Processed"
        break;
        case TRASH:
            dbList = "Trash"
        break;
        default:
    }

    let localList = db[dbList];
    let itemndx = localList.indexOf(item);

    console.log("local list = ", localList)
    console.log("ammendment action = ", action)
    console.log("index of item = ", itemndx)
    switch (action) {
        case REMOVE:
            localList.splice(itemndx, 1);
            pushChanges(REMOVE, item, dbList, shippingFunction);
        break;
        case ADD:
            localList.unshift(item);
            pushChanges(ADD, item, dbList, shippingFunction);
        break;
        case UPDATE:
            localList[itemndx] = item;
            pushChanges(UPDATE, item, dbList, shippingFunction);
        break;
        default:
    }

    console.log("local list post ammendment = ", localList)
}
/* 

function changeNavigation(id, navChanger){
    let nav;
    if(title === PROJECTS) {
        nav = {
            title: PROJECTS,
            view: "DETAILS",
            ID: itemID
        }
    } else {
        nav = {
            title: title,
            view: "DETAILS",
            ID: id
        }
    }
    changeNav(nav);
}

*/

// export function passTitle(e, ChangeTitleFunction) {
//     let targ = e.target;
//     checkForTitle(targ)
//     function checkForTitle (t) {
//         if (t.title) {
//             ChangeTitleFunction(t.title);
//         } else {
//             t = t.parentNode;
//             checkForTitle (t);   
//         }
//     }
// }

// function passKey(e, changeIDFunction) {
//     //Takes the events target and checks for title attribute 
//     //If no title attribute, check parent node for title attribute
//     //If not found, repeat step 2
//     let targ = e.target;
//     checkForID(targ);
//     function checkForID (t) {
//         if (t.id) {
//             changeIDFunction(t.id);
//         } else {
//             t = t.parentNode;
//             checkForID (t);   
//         }
//     }
// }