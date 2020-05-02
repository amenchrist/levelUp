import {CHANGE_VIEW} from './contants';

export const setView = (item) => {
    console.log(item);
    return {
    type: CHANGE_VIEW,
    payload: item
}};


