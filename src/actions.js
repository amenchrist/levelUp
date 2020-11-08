import { 
    SELECT_VIEW, SELECT_PROJECT, SELECT_TASK, SELECT_TITLE, SELECT_ITEM, 
    UPDATE_EXP, RESTORE_PREVIOUS_STATE, UPDATE_TASK_STATUS, 
    SET_ACTIVE_TASK, RETRIEVE_DB, REFRESH_DB, CHANGE_NAV
  } from './constants';

export const ChangeNav = (navObj) => {
  return {
    type: CHANGE_NAV,
    payload: navObj
  }
}
export const selectTitle = (title) => {
  return {
  type: SELECT_TITLE,
  payload: title
}};

export const selectItem = (itemID) => {
  return {
  type: SELECT_ITEM,
  payload: itemID
}};

export const selectView = (view) => {
  return {
  type: SELECT_VIEW,
  payload: view
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

export const UpdateExp = (exp) => {
    return {
    type: UPDATE_EXP,
    payload: exp,
    expTimestamp: new Date().getTime()
}};

export const RestorePreviousState = (previousState) => {
    return {
    type: RESTORE_PREVIOUS_STATE,
    payload: previousState
}};

export const UpdateTaskStatus = (status) => {
    return {
    type: UPDATE_TASK_STATUS,
    payload: status
}};

export const SetActiveTask = (task) => {
    return {
    type: SET_ACTIVE_TASK,
    payload: task
}};

export const RetrieveDB = (database) => {
    return {
        type: RETRIEVE_DB,
        payload: database
    }
}

export const RefreshDB = (database) => {
    return {
        type: REFRESH_DB,
        payload: database
    }
}

////////////////////

// ASYNC REQUESTS

export const SELECT_RECORD = 'SELECT_RECORD';

export function SelectRecord(record) {
  return {
    type: SELECT_RECORD,
    payload: record
  }
}

export const INVALIDATE_RECORD = 'INVALIDATE_RECORD';

export function InvalidateRecord(record) {
  return {
    type: INVALIDATE_RECORD,
    record
  }
}

export const REQUEST_ITEMS = 'REQUEST_ITEMS';

export function RequestItems(record) {
  return {
    type: REQUEST_ITEMS,
    record
  }
}

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

export function ReceiveItems(record, json) {
  return {
    type: RECEIVE_ITEMS,
    record,
    items: json,
    receivedAt: Date.now()
  }
}

//////////////////////////////////////////////////////

//import fetch from 'cross-fetch'



export function FetchItems(record) {
  return dispatch => {
    dispatch(RequestItems(record))
    return fetch(serverLink) //https://secret-citadel-16777.herokuapp.com/
      .then(response => response.json())
      .then(json => { console.log(json); dispatch(ReceiveItems(record, json))})
      .catch((error) => {
        console.log("Error: ", error);
        setTimeout(dispatch(FetchItems(record)), 5000);
      })
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk!
      return dispatch(FetchItems(subreddit))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

////////////////////////////////////

export const PACK_ITEMS = 'PACK_ITEMS';

export function PackItems(items) {
  return {
    type: PACK_ITEMS,
    payload: items
  }
}

export const DELIVER_ITEMS = 'DELIVER_ITEMS';

export function DeliverItems(agent, json) { // record/agent/destination
  return {
    type: DELIVER_ITEMS,
    agent,
    payload: json,
    deliveredAt: Date.now()
  }
}

// const testItem = {
//   content: "this is a test item fom the front end"
// }

const agent1 = "amen"


export function ShipItems(items, agent, record) {
  return dispatch => {
    dispatch(PackItems(items))
    console.log("packed items: ", items)
    return fetch(`${serverLink}${agent1}`, { 
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items)
    })
      .then(response => response.json())
      .then(json => {dispatch(DeliverItems(agent, json)); dispatch(UpdateExp(json.exp));})
      .catch((error) => {
        console.log("Error: ", error);
        setTimeout(ShipItems(items, agent), 5000);
      })
  }
}

const serverLink = "http://localhost:5000/"//"https://secret-citadel-16777.herokuapp.com/";
//const serverLink2 = "http://localhost:5000/";