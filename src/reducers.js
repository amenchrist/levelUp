import { combineReducers } from 'redux';

import { 
    CHANGE_VIEW, OVERVIEW, SELECT_ITEM, UPDATE_EXP, 
    RESTORE_PREVIOUS_STATE, UPDATE_TASK_STATUS, SET_ACTIVE_TASK, 
    RETRIEVE_DB, REFRESH_DB 
} from "./constants"

import { SELECT_RECORD, INVALIDATE_RECORD, REQUEST_ITEMS, RECEIVE_ITEMS, PACK_ITEMS, DELIVER_ITEMS } from './actions';

const initialState = {
    itemID: 0,
    previousItemID: 0,
    exp: 0,
    view: OVERVIEW,
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
    db: { lastUpdated: 0}
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

const selectViewReducer = (state=initialState, action={}) => {
    switch(action.type){
        case CHANGE_VIEW:
            // state.previousView.unshift(state.view);
            return Object.assign({}, state, {view: action.payload, previousView: state.view, previousState: state});
        default:
            return state;
    }
}

// const initialItemViewState = {
//     project: 0,
//     task: 0,
//     itemID: 0 
// }

const selectItemReducer = (state=initialState, action={}) => {
    switch(action.type){
        case SELECT_ITEM:
            return Object.assign({}, state, {itemID: action.payload, previousItemID: state.itemID, previousState: state});
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
    activeSince: null,
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



let serverLink = "http://localhost:5000";// "https://secret-citadel-16777.herokuapp.com/"


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
    selectViewReducer, selectItemReducer, 
    UpdateExpReducer, RestorePreviousStateReducer, 
    UpdateTaskStatusReducer, SetActiveTaskReducer, 
    SelectRecordReducer, items
});

export default rootReducer