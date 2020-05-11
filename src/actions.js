import {CHANGE_VIEW, SELECT_PROJECT, SELECT_TASK, SELECT_ITEM} from './constants';

export const selectView = (item) => {
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
    return {
    type: SELECT_TASK,
    payload: taskID
}};

export const selectItem = (itemID) => {
    return {
    type: SELECT_ITEM,
    payload: itemID
}};