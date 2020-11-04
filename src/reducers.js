import { combineReducers } from 'redux';

import { 
    SELECT_VIEW, OVERVIEW, SELECT_ITEM, UPDATE_EXP, TASKS, INBOX, REFERENCES, TODAY,
    RESTORE_PREVIOUS_STATE, UPDATE_TASK_STATUS, SET_ACTIVE_TASK, HOME, SELECT_TITLE, PROJECTS, LIST, NEW_ITEM, NEW, CHANGE_NAV, MISSION_TASKS, REMINDERS
} from "./constants"

import { SELECT_RECORD, INVALIDATE_RECORD, REQUEST_ITEMS, RECEIVE_ITEMS, PACK_ITEMS, DELIVER_ITEMS } from './actions';

const initialState = {
    title: HOME, 
    itemID: 0,
    view: OVERVIEW,
    missionID: 0,
    previousTitle: HOME,
    previousItemID: 0,
    previousView: OVERVIEW,
    previousState: {},
    taskStatus: '',
    agent: '',
    record: {
        isFetching: false,
        didInvalidate: false,
        receivedAt: 0,
        items: {}
    },
    latestUpdate: {
        items: {},
        isShipping: false,
        deliveredAt: 0
    },
    exp: 0,
    db: { lastUpdated: 0}
}

// const selectTitleReducer = (state=initialState, action={}) => {
//     switch(action.type){
//         case SELECT_TITLE:
//             let lists = [ PROJECTS, TASKS, INBOX, REFERENCES, DUE_TODAY]
//             let view = OVERVIEW;
//             if (lists.indexOf(action.payload) !== -1) {
//                 view = LIST;
//             }
//             return Object.assign({}, state, {title: action.payload, view: view, previousTitle: state.title, previousState: state});
//         default:
//             return state;
//     }
// }


const values = (state=initialState, action={}) => {
    switch(action.type){
        case SELECT_TITLE:
            let lists = [ PROJECTS, TASKS, INBOX, REFERENCES, REMINDERS, TODAY ]
            let view = OVERVIEW;
            let ID = 0;
            if (lists.indexOf(action.payload) !== -1) {
                view = LIST;
            } 
            if (((lists.indexOf(action.payload) !== -1) && state.view === NEW) || (action.payload === NEW_ITEM) ) {
                view = "NEW"
            }
            return Object.assign({}, state, {title: action.payload, view: view, itemID:ID, previousTitle: state.title, previousState: state});
        case CHANGE_NAV:
            if(action.payload.title === PROJECTS){state.missionID = action.payload.ID}
            return Object.assign({}, state, {title: action.payload.title, view: action.payload.view, itemID:action.payload.ID, previousTitle: state.title, previousItemID: state.itemID, previousView: state.view, missionID : state.missionID, previousState: state});
        case SELECT_ITEM:
            //action.payload.title === PROJECTS ? state.missionID = action.payload.ID : state.missionID = 0;
            return Object.assign({}, state, {itemID: action.payload, previousItemID: state.itemID, previousState: state});
        case SELECT_VIEW:
            //action.payload.title === PROJECTS ? state.missionID = action.payload.ID : state.missionID = 0;
            return Object.assign({}, state, {view: action.payload, previousView: state.view, previousState: state});
        default:
            return state;
    }
}


const RestorePreviousStateReducer = (state=initialState, action={}) => {
    switch(action.type){
        case RESTORE_PREVIOUS_STATE:
            if(state.previousState === {}) {
                break;
            } else {
                return Object.assign({}, state.previousState );
            }
        default:
            return state;
    }
}

const UpdateExpReducer = (state=initialState, action={}) => {
    switch(action.type){
        case UPDATE_EXP:
            return Object.assign({}, state, {exp: (state.exp + action.payload)});
        default:
            return state;
    }
}

const UpdateTaskStatusReducer = (state=initialState, action={}) => {
    switch(action.type){
        case UPDATE_TASK_STATUS:
            return Object.assign({}, state, {taskStatus: action.payload});
        default:
            return state;
    }
}

const initialActiveTask = {
    activeTask: {},
    activeSince: 0,
    timeNow: (new Date()).getTime()
}

const SetActiveTaskReducer = (state=initialActiveTask, action={}) => {
    switch(action.type){
        case SET_ACTIVE_TASK:
            return Object.assign({}, state, {activeTask: action.payload, activeSince: (new Date()).getTime() });
        default:
            return state;
    }
}



//let serverLink = "http://localhost:5000";// "https://secret-citadel-16777.herokuapp.com/"


//////////////////////////////////////////////// 17.10.2020 async app upgrade

/// State shape


function SelectRecordReducer(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_RECORD:
      return action.payload
    default:
      return state
  }
}

function items(
  state = initialState,
  action
) {
  switch (action.type) {
    case INVALIDATE_RECORD:
      return Object.assign({}, state, { records: {didInvalidate: true} })
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        record: {
          isFetching: true,
          didInvalidate: false
        }
      })
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {
        record: {
          isFetching: false,
          didInvalidate: false,
          receivedAt: action.receivedAt,
          items: action.items
        }
      })
    case PACK_ITEMS:
        return Object.assign({}, state, {
            latestUpdate: {
                items: action.payload,
                isShipping: true,
                deliveredAt: 0
            },
        })
    case DELIVER_ITEMS:
        console.log("Special Delivery: ", action.payload)
        return Object.assign({}, state, {
            latestUpdate: {
                items: action.payload,
                isShipping: false,
                deliveredAt: action.deliveredAt
            },
        })
    default:
      return state
  }
}

const rootReducer = combineReducers({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    values, UpdateExpReducer, RestorePreviousStateReducer, 
    UpdateTaskStatusReducer, SetActiveTaskReducer, 
    SelectRecordReducer, items
});

export default rootReducer