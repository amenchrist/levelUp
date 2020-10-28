import React from 'react';
import { OVERVIEW } from '../constants';
import ActiveTaskTimer from './ActiveTaskTimer';
import SyncStatusDot from './SyncStatusDot';
//import React, { useState, useEffect } from 'react';

// import { connect } from 'react-redux';
// import { UpdateTaskStatus, SetActiveTask, selectItem } from '../actions';

// const mapStateToProps = state => {
//     return {
//         activeTask: state.SetActiveTaskReducer.activeTask,
//         status: state.UpdateTaskStatusReducer.taskStatus,
//         activeSince: state.SetActiveTaskReducer.activeSince,
//         timeNow: state.SetActiveTaskReducer.timeNow
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateTaskStatus: (status) => {
//             return dispatch(UpdateTaskStatus(status))
//         },
//         setActiveTask: (task) => {
//             return dispatch(SetActiveTask(task))
//         },
//         changeItemID: (id) => {
//             return dispatch(selectItem(id))
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StatsOverview);

export default function StatsOverview({ touchFunction, exp }) {

    return (
        <article className="h-100 w-100 center bg-white pa2 " data-view={OVERVIEW} title = "STATS" onClick={touchFunction}>
            <SyncStatusDot />
            <div className="tc w-100 h-100">
                <h1 className="f2 mb0 ">Amen Christ</h1>
                <h3 className="f6 pa1 gray ">Engineer</h3>
                <h4 className="f6 gray ">Exp: {exp}</h4>
                <ActiveTaskTimer />
            </div>
        </article>  
    );
}


