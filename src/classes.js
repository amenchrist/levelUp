import {TASK, PENDING, PROJECT, UNPLANNED } from './constants';

export class Task{
    constructor(name,outcome, isDelegatable, requiredContext, associatedProjectID) {
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
        this.dueDate = (new Date()).toISOString().substr(0, 10);
        this.timeRequired = 0;
        this.timeRemaining = 0;
        this.requirements = '';
        this.associatedProjectID = 0;
        this.exp = 10;
        this.isDelegatable = isDelegatable;
        this.description = '';
        this.agent = '';
        
    }
}

export class Project{
    constructor(outcome, description) {
        const d = new Date();
        this.type = PROJECT;        
        this.id = d.getTime();
        this.name = outcome;
        this.description = '';
        this.outputRecordID = null;
        this.dueDate = (new Date((d.getTime() + 7776000000))).toISOString().substr(0, 10); // 3 months from the date the project is planned 
        this.timeRequired = 7776000000;
        this.timeRemaining = setInterval(()=> {
            let timeNow = (new Date()).getTime();
            return (this.dueDate - timeNow)
        }, 1);
        this.status = UNPLANNED;
        this.nextAction = {};
        this.taskList = [];
    }
}