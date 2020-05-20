import { CHANGE_VIEW, OVERVIEW, SELECT_ITEM, UPDATE_EXP, RESTORE_PREVIOUS_STATE } from "./constants"

const initialState = {
    itemID: 0,
    previousItemID: 0,
    exp: 0,
    view: OVERVIEW,
    previousView: OVERVIEW,
    previousState: {}
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

