import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Task, StatusType } from './constants';

export class TaskService {
 
taskList: Task[];

observer;

  constructor () {
   
    const mockData = [
      {
        id: 0,
        status: StatusType.NotStarted,
        title: 'Kök',
        description: 'Diska',
      },
      {
        id: 1,
        status: StatusType.Completed,
        title: 'Fastighet',
        description: 'Städa',
      },
      {
        id: 2,
        status: StatusType.InProgress,
        title: 'Matlagning',
        description: 'Laga mat',
      }
    ];
    this.taskList = mockData;
  }

   
   filterTasks(statusType: StatusType, taskList: Task[] = []): Task[] {
    return taskList.filter((task) => {
      return task.status === statusType;
    });
  }


  getTasks(): Observable<Task[]> {
    
    return new Observable((observer) => {
      this.observer = observer;
      return this.observer.next(this.taskList);
    });
  }

  updateTask(id: number, status: StatusType) {
    
    console.log(id, status);
    this.taskList.find(item => item.id === id).status = status;
  }

  addTask(title: string, description: string) {
    
    this.taskList.push({
      id: this.taskList.length,
      status: StatusType.NotStarted,
      title: title,
      description: description,

    });
    this.observer.next(this.taskList);
  }
}