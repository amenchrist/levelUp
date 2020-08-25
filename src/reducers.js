import { CHANGE_VIEW, OVERVIEW, SELECT_ITEM, UPDATE_EXP, RESTORE_PREVIOUS_STATE, UPDATE_TASK_STATUS, SET_ACTIVE_TASK, RETRIEVE_DB } from "./constants"

const initialState = {
    itemID: 0,
    previousItemID: 0,
    exp: 0,
    view: OVERVIEW,
    previousView: OVERVIEW,
    previousState: {},
    taskStatus: '',
    db: {}
}

export const RestorePreviousStateReducer = (state=initialState, action={}) => {
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

export const selectViewReducer = (state=initialState, action={}) => {
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

export const selectItemReducer = (state=initialState, action={}) => {
    switch(action.type){
        case SELECT_ITEM:
            return Object.assign({}, state, {itemID: action.payload, previousItemID: state.itemID, previousState: state});
        default:
            return state;
    }
}

// const initialExpState = {
//     exp: 0
// }

export const UpdateExpReducer = (state=initialState, action={}) => {
    switch(action.type){
        case UPDATE_EXP:
            return Object.assign({}, state, {exp: (state.exp + action.payload)});
        default:
            return state;
    }
}

export const UpdateTaskStatusReducer = (state=initialState, action={}) => {
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

export const SetActiveTaskReducer = (state=initialActiveTask, action={}) => {
    switch(action.type){
        case SET_ACTIVE_TASK:
            return Object.assign({}, state, {activeTask: action.payload, activeSince: (new Date()).getTime() });
        default:
            return state;
    }
}

export const RetrieveDBReducer = (state=initialState, action={}) => {
    switch(action.type){
        case RETRIEVE_DB:
            return Object.assign({}, state, {db: action.payload});
        default:
            return state;
    }
}