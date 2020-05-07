import { CHANGE_VIEW, OVERVIEW, SELECT_ITEM } from "./constants"

const initialHomeState = {
    projects: 0,
    tasks: 0,
    inbox: 0,
    project: 0,
    task: 0,
    itemID: 0,
    view: OVERVIEW 
}

export const selectViewReducer = (state=initialHomeState, action={}) => {
    switch(action.type){
        case CHANGE_VIEW:
            return Object.assign({}, state, {view: action.payload});
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


