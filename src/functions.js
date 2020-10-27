/// For all the extra functions required in multiple places

import { CALENDAR, COMPLETED, DAILY, DETAILS, HOME, INBOX, PROJECTS, REFERENCES, REMINDERS, SOMEDAY, STATS, TASKS, TODAY, TRASH } from "./constants";

export function passTitle(e, ChangeTitleFunction) {
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
}

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
    navTitle === "STATS" ? navView = "OVERVIEW" : navView = "LIST";
    navTitle === "NEW_ITEM" ? navView = "NEW" : navView = "LIST";

   
    !(parseInt(navID) >= 0) ? navID = 0 : console.log("");

    const titles = [ PROJECTS, TASKS, INBOX, REFERENCES, TODAY, DAILY, SOMEDAY, TRASH, CALENDAR, REMINDERS, STATS, HOME, COMPLETED ]
    if (titles.indexOf(navTitle) === -1){
        navTitle = state.title;
    }
    console.log("this is state: ", state)
    console.log("this is navID: ", navID)
    if (parseInt(state.itemID) === 0 && parseInt(navID) > 0 ) {
        navView = DETAILS;
    }

    const nav = {
        title: navTitle,
        view: navView,
        ID: navID
    }
    console.log(nav)
    navChanger(nav);
}


export function pushChanges(action, item, list, shippingFunction){
    let state = {
        action: action,
        list: list,
        item: item,
        pushDate: (new Date()).getTime()
    }
    shippingFunction(state);
}

//time spent calc

export function calculateTime(timeSpent){
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