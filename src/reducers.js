import { CHANGE_VIEW } from "./contants"

const initialState = {
    projects: 0,
    tasks: 0,
    inbox: 0,
    view: "Overview" 
}

export const selectView = (state=initialState, action={}) => {
    switch(action.type){
        case CHANGE_VIEW:
            return Object.assign({}, state, {view: action.payload});
        default:
            return state;
    }
}