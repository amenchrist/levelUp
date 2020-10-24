/// For all the extra functions required in multiple places

import { CALENDAR, DAILY, DETAILS, HOME, INBOX, PROJECTS, REFERENCES, REMINDERS, SOMEDAY, STATS, TASKS, TODAY, TRASH } from "./constants";

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
    console.log("Nav ID is a ", typeof navID)
    console.log("Nav ID parsed= ", parseInt(navID))
   
    //typeof navID !== "number" ? navID = 0 : navID = navID;
    !(parseInt(navID) >= 0) ? navID = 0 : navID = navID;

    const titles = [ PROJECTS, TASKS, INBOX, REFERENCES, TODAY, DAILY, SOMEDAY, TRASH, CALENDAR, REMINDERS, STATS, HOME ]
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