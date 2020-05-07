import { TASK } from "./constants";

export const TaskList = [
    {
        type: TASK,
        id: 1,
        name: 'Task 1',
        description: 'About Task 1',
        output: 'recordable product of task completion',
        outputRecordID: 0, //Assigned on task completion
        associatedProject: {
            id: 1,
            name: 'Project 1',
            goal: 'What done looks like for Project 1'
        },
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 900, //In seconds
        status: 'PENDING' //PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
    },
    {
        type: TASK,
        id: 2,
        name: 'Task 2',
        description: 'About Task 2',
        output: 'recordable product of task completion',
        outputRecordID: null, //Assigned on task completion
        associatedProject: {
            id: 1,
            name: 'Project 1',
            goal: 'What done looks like for Project 1'
        },
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 900, //In seconds
        status: 'PENDING' //PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
    },
    {
        type: TASK,
        id: 3,
        name: 'Task 3',
        description: 'About Task 3',
        output: 'recordable product of task completion',
        outputRecordID: null, //Assigned on task completion
        associatedProject: {
            id: 1,
            name: 'Project 1',
            goal: 'What done looks like for Project 1'
        },
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 900, //In seconds
        status: 'PENDING' //PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
    },
    {
        type: TASK,
        id: 4,
        name: 'Task 4',
        description: 'About Task 4',
        output: 'recordable product of task completion',
        outputRecordID: null, //Assigned on task completion
        associatedProject: {
            id: 1,
            name: 'Project 1',
            goal: 'What done looks like for Project 1'
        },
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 900, //In seconds
        status: 'PENDING' //PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
    },
    {
        type: TASK,
        id: 5,
        name: 'Task 5',
        description: 'About Task 5',
        output: 'recordable product of task completion',
        outputRecordID: null, //Assigned on task completion
        associatedProject: {
            id: 1,
            name: 'Project 1',
            goal: 'What done looks like for Project 1'
        },
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 900, //In seconds
        status: 'PENDING' //PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
    }
]