import { CHANGE_VIEW, OVERVIEW, SELECT_ITEM } from "./constants"

const initialHomeState = {
    projects: 0,
    tasks: 0,
    inbox: 0,
    project: 0,
    task: 0,
    itemID: 0,
    exp: 20,
    view: OVERVIEW,
    previousView: OVERVIEW
}

export const selectViewReducer = (state=initialHomeState, action={}) => {
    switch(action.type){
        case CHANGE_VIEW:
            // state.previousView.unshift(state.view);
            return Object.assign({}, state, {view: action.payload, previousView: state.view});
        default:
            return state;
    }
}

const initialItemViewState = {
    project: 0,
    task: 0,
    itemID: 0 
}

export const selectItemReducer = (state=initialItemViewState, action={}) => {
    switch(action.type){
        case SELECT_ITEM:
            return Object.assign({}, state, {itemID: action.payload});
        default:
            return state;
    }
}


