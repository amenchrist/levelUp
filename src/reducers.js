import { combineReducers } from 'redux';

import { 
    SELECT_VIEW, OVERVIEW, SELECT_ITEM, UPDATE_EXP, TASKS, INBOX, REFERENCES, TODAY,
    RESTORE_PREVIOUS_STATE, UPDATE_TASK_STATUS, SET_ACTIVE_TASK, HOME, SELECT_TITLE, 
    MISSIONS, LIST, NEW_ITEM, NEW, CHANGE_NAV, MISSION_TASKS, EVENTS, ACTIVE
} from "./constants"

import { SELECT_RECORD, INVALIDATE_RECORD, REQUEST_ITEMS, RECEIVE_ITEMS, PACK_ITEMS, DELIVER_ITEMS, CREATE_ALERT, CLOSE_ALERT } from './actions';

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
    expTimestamp: 0,
    db: { lastUpdated: 0},
    alerts: []
}

// const selectTitleReducer = (state=initialState, action={}) => {
//     switch(action.type){
//         case SELECT_TITLE:
//             let lists = [ MISSIONS, TASKS, INBOX, REFERENCES, DUE_TODAY]
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
            let lists = [ MISSIONS, TASKS, INBOX, REFERENCES, EVENTS, TODAY ]
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
            if(action.payload.title === MISSIONS){state.missionID = action.payload.ID}
            return Object.assign({}, state, {title: action.payload.title, view: action.payload.view, itemID:action.payload.ID, previousTitle: state.title, previousItemID: state.itemID, previousView: state.view, missionID : state.missionID, previousState: state});
        case SELECT_ITEM:
            //action.payload.title === MISSIONS ? state.missionID = action.payload.ID : state.missionID = 0;
            return Object.assign({}, state, {itemID: action.payload, previousItemID: state.itemID, previousState: state});
        case SELECT_VIEW:
            //action.payload.title === MISSIONS ? state.missionID = action.payload.ID : state.missionID = 0;
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
            console.log(action);
            console.log(state);
            let newXP, newTimestamp;
            if (parseInt(action.expTimeStamp) === parseInt(state.expTimestamp)) {
                newXP = 0;
                newTimestamp = parseInt(state.expTimestamp);
            } else {
                newXP = parseInt(action.payload);
                newTimestamp = parseInt(action.expTimestamp);
                //console.log("new xp = ", newXP)
            }
            return Object.assign({}, state, {exp: (state.exp + newXP), expTimestamp: newTimestamp});
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
    timeNow: (new Date()).getTime(),
    timerOn: false
}

const SetActiveTaskReducer = (state=initialActiveTask, action={}) => {
    switch(action.type){
        case SET_ACTIVE_TASK:
            let lastActive;
            //action.payload.timeSpent === 0 ? lastActive = (new Date()).getTime() : lastActive = action.payload.activeSince;

            console.log("from AT Reducer: ", state)
            let timerOn;
            action.payload.status === ACTIVE && state.timerOn === false ? timerOn = true : timerOn = false
            return Object.assign({}, state, {activeTask: action.payload, activeSince: action.payload.activeSince, timerOn });
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
                deliveredAt: action.deliveredAt,
                updateAcknowledged: false
            },
        })
    case CREATE_ALERT:
        let alertArray = state.alerts
        alertArray.unshift(action.payload)

        // payload: {
        //     timeStamp: Date.now(),
        //     message: msg,
        //   }

        return Object.assign({}, state, {
            alerts: alertArray
        })
    case CLOSE_ALERT:
        alertArray = state.alerts
        //alertArray.indexOf(action.payload)
        function notAlerted(element){
            return element !== action.payload
        }
        
        return Object.assign({}, state, {
            alerts: alertArray.filter(notAlerted)
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