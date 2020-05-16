import { TASK, LOW } from "./constants";

export const TaskList = [
    {
        type: TASK,
        id: 1589657001522,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 0,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 5 ',
        outcome: 'Bread in the fridge',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedProject: {
            id: 11,
            name: 'Project 1',
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001523,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 0,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 4 ',
        outcome: 'Bread in the fridge',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedProject: {
            id: 11,
            name: 'Project 1',
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001524,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 0,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 3 ',
        outcome: 'Bread in the fridge',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedProject: {
            id: 11,
            name: 'Project 1',
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001525,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 0,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread 2',
        outcome: 'recordable product of task completion',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedProject: {
            id: 11,
            name: 'Project 1',
        },
        requirements: '£1 minimum',
        exp: 10
    },
    {
        type: TASK,
        id: 1589657001526,
        entryDate: 20,
        status: 'PENDING' ,//PENDING, STARTED, UNFINISHED, DEFERED, NOT_STARTED, COMPLETED
        frequency: 0,
        timeSpent: 0,
        priority : LOW,
        outcomeRecordID: 0, //Assigned on task completion
        name: 'Buy bread',
        outcome: 'recordable product of task completion',
        requiredContext: 'At the Supermarket',
        note: 'Brown bread preferably',
        dueDate: 1589657001526, //gmt timestamp
        timeRequired: 900, //In seconds
        associatedProject: {
            id: 11,
            name: 'Project 1',
        },
        requirements: '£1 minimum',
        exp: 10
    }
]

/*
this.type = INBOX_ITEM;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.status = PENDING;
        this.frequency = ONCE;
        this.timeSpent = 0;
        this.name = name;
        this.outcome = '';
        this.requiredContext = '';
        this.description = description;
        this.requirements = '';
*/