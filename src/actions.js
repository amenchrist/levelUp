import {CHANGE_VIEW, SELECT_PROJECT, SELECT_TASK, SELECT_ITEM} from './constants';

export const selectView = (item) => {
    console.log(item);
    return {
    type: CHANGE_VIEW,
    payload: item
}};

export const selectProject = (projectID) => {
    return {
    type: SELECT_PROJECT,
    payload: projectID
}};

export const selectTask = (taskID) => {
    console.log(taskID);
    return {
    type: SELECT_TASK,
    payload: taskID
}};

export const selectItem = (itemID) => {
    console.log(itemID);
    return {
    type: SELECT_ITEM,
    payload: itemID
}};
