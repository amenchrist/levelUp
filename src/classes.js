import {TASK, PENDING, MISSION, UNPLANNED, ASAP, UNPROCESSED, INBOX_ITEM, EVENT, REFERENCE } from './constants';

export class Item{
    constructor(name,description='None') {
        const d= new Date();

        this.type = INBOX_ITEM;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.name = name;
        this.description = '';
        this.status = UNPROCESSED;
        this.exp = 5;
        this.isTrashed = false;

    }
}

export class Task{
    constructor(name,outcome, requiredContext, associatedMissionID = 0, dueDate = ASAP) {
        const d = new Date();
        this.type = TASK;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.status = PENDING;
        this.priority = 'NONE';
        this.frequency = 0;
        this.timeSpent = 0;
        this.outcomeRecordID = 0;
        this.name = name;
        this.outcome = outcome;
        this.requiredContext = requiredContext;
        this.note = '';
        this.dueDate = dueDate//(new Date()).toISOString().substr(0, 10);
        this.timeRequired = 0;
        this.timeRemaining = 0;
        this.requirements = '';
        this.associatedMissionID = associatedMissionID;
        this.exp = 20;
        this.description = '';
        this.agent = '';
        this.isTrashed = false;
        
    }
}

export class Mission{
    constructor(outcome ='', purpose ='', description = '', dueDate = ASAP, requirements = '', priority, frequency = '' ) {
        const d = new Date();
        this.type = MISSION;        
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.name = outcome;
        this.description = description;
        this.outputRecordID = null;
        this.dueDate = dueDate //(new Date(parseInt((d.getTime() + 7776000000)))).toISOString().substr(0, 10); // 3 months from the date the MISSION is planned 
        this.timeRequired = 7776000000;
        this.timeSpent = 0;
        this.timeRemaining = setInterval(()=> {
            let timeNow = (new Date()).getTime();
            return (this.dueDate - timeNow)
        }, 1);
        this.status = UNPLANNED;
        this.nextAction = {};
        this.taskList = [];
        this.principles = '';
        this.requirements = requirements;
        this.exp = 100;
        this.purpose = purpose;
        this.priority = priority;
        this.frequency = frequency;
        this.note = '';
        this.isTrashed = false;
    }
}

export class Reference{
    constructor(name, details='') {
        const d= new Date();
        this.type = REFERENCE;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.name = name;
        this.details = details;
        this.exp = 5;
        this.isTrashed = false;
    }
}

export class Event{
    constructor(name, date = new Date().getTime(), note ='') {
        const d= new Date();
        this.type = EVENT;
        this.id = d.getTime();
        this.entryDate = d.getTime();
        this.name = name;
        this.note = note;
        this.date = date;
        this.exp = 5;
        this.isTrashed = false;
    }
}