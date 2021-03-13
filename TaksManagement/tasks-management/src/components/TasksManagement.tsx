import React from 'react';
import { TasksTypes } from '../types/Task';
import AddTask from './AddTask';
import TasksList from './TasksList';

interface IState {
  taskLists: TasksTypes.TaskDetails[]
};

interface IProps {

}

class TasksManagement extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      taskLists: []
    };
  }

  addTasks(task: TasksTypes.TaskDetails) {
    this.setState({ taskLists: [...this.state.taskLists, task] })
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-6"><AddTask addTasks={this.addTasks.bind(this)}></AddTask></div>
          <div className="col-6"><TasksList taskLists={this.state.taskLists}></TasksList></div>
      </div>
      </div>
    );
  }
}

export default TasksManagement;