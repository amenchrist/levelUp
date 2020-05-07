import { PROJECT } from "./constants";

export const ProjectList = [
    {
        type: PROJECT,
        id: 11,
        name: 'Project 1',
        description: 'About Project 1',
        goal: 'What done looks like for Project 1',
        output: 'Recordable proof of completed project',
        outputRecordID: null, //Assigned on completion
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 2629746, //In seconds (Average Time it has historically taken for the whole project to be completed by you or someone else)
        timeRemaining: 2629746,
        status: 'NOT_STARTED', //STARTED, ONGOING, NOT_STARTED, COMPLETED
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
        id: 12,
        name: 'Project 2',
        description: 'About Project 2',
        goal: 'What done looks like for Project 2',
        output: 'Recordable proof of completed project',
        outputRecordID: null, //Assigned on completion
        dueDate: 1591012800, //gmt timestamp
        timeRequired: 2629746, //In seconds
        timeRemaining: 2629746,
        status: 'NOT_STARTED',
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
        id: 13,
        name: 'Project 3',
        description: 'About Project 3',
        goal: 'What done looks like for Project 3',
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
        id: 14,
        name: 'Project 4',
        description: 'About Project 4',
        goal: 'What done looks like for Project 4',
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
        id: 15,
        name: 'Project 5',
        description: 'About Project 5',
        goal: 'What done looks like for Project 5',
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