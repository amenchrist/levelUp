import { InboxItems } from './InboxItems';
import { ProjectList } from './ProjectList';
import { TaskList } from './TaskList';

export const db = InboxItems.concat(ProjectList, TaskList);