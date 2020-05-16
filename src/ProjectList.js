import { PROJECT, UNPLANNED } from "./constants";

export const ProjectList = [
    {
        type: PROJECT,
        id: 1589657001530,
        name: 'Project 1',
        description: 'About Project 1',
        outcome: 'What done looks like for Project 1',
        output: 'Recordable proof of completed project',
        outputRecordID: null, //Assigned on completion
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 2629746, //In seconds (Average Time it has historically taken for the whole project to be completed by you or someone else)
        timeRemaining: 2629746,
        status: UNPLANNED, //STARTED, ONGOING, NOT_STARTED, COMPLETED, UNPLANNED, UNFINISHED
        nextAction: {
            id: 16,
            task: 'First physical action',
            output: 'recordable product of task completion' //information, document etc
        },
        taskList: [
            {
                id: 1,
                task: 'A physical action'
            },
            {
                id: 2,
                task: 'Another physical action'
            }
        ]
    },
    {
        type: PROJECT,
        id: 1589657001531,
        name: 'Project 2',
        description: 'About Project 2',
        outcome: 'What done looks like for Project 2',
        output: 'Recordable proof of completed project',
        outputRecordID: null, //Assigned on completion
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 2629746, //In seconds
        timeRemaining: 2629746,
        status: UNPLANNED,
        nextAction: {
            id: 17,
            task: 'First physical action'
        },
        taskList: [
            {
                id: 1,
                task: 'A physical action'
            },
            {
                id: 2,
                task: 'Another physical action'
            }
        ]
    },
    {
        type: PROJECT,
        id: 1589657001532,
        name: 'Project 3',
        description: 'About Project 3',
        outcome: 'What done looks like for Project 3',
        output: 'Recordable proof of completed project',
        outputRecordID: null, //Assigned on completion
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 2629746, //In seconds
        timeRemaining: 2629746,
        status: 'NOT_STARTED',
        nextAction: {
            id: 16,
            task: 'First physical action'
        },
        taskList: [
            {
                id: 1,
                task: 'A physical action'
            },
            {
                id: 2,
                task: 'Another physical action'
            }
        ]
    },
    {
        type: PROJECT,
        id: 1589657001533,
        name: 'Project 4',
        description: 'About Project 4',
        outcome: 'What done looks like for Project 4',
        output: 'Recordable proof of completed project',
        outputRecordID: null, //Assigned on completion
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 2629746, //In seconds
        timeRemaining: 2629746,
        status: 'NOT_STARTED',
        nextAction: {
            id: 16,
            task: 'First physical action'
        },
        taskList: [
            {
                id: 1,
                task: 'A physical action'
            },
            {
                id: 2,
                task: 'Another physical action'
            }
        ]
    },
    {
        type: PROJECT,
        id: 1589657001534,
        name: 'Project 5',
        description: 'About Project 5',
        outcome: 'What done looks like for Project 5',
        output: 'Recordable proof of completed project',
        outputRecordID: null, //Assigned on completion
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 2629746, //In seconds
        timeRemaining: 2629746,
        status: 'NOT_STARTED',
        nextAction: {
            id: 16,
            task: 'First physical action'
        },
        taskList: [
            {
                id: 1,
                task: 'A physical action'
            },
            {
                id: 2,
                task: 'Another physical action'
            }
        ]
    }
]