import React from 'react';
import { TasksTypes } from '../types/Task';
import TaskViewer from './TaskViewer';

interface IState {
  taskLists: TasksTypes.TaskDetails[]
};

interface IProps {
  taskLists: TasksTypes.TaskDetails[]
}


class TasksList extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      taskLists: this.props.taskLists
    };
  };

  reload() {
    fetch('api/TasksApi/GetTasks', {
      method: 'GET',
    }).then((response) => {
      response.json().then((data: TasksTypes.Response.GetTaskResponse) => {
        this.setState({ taskLists: data.tasks })
      })
    }).catch(() => {
      alert("Server error")
    });
  }

  componentWillReceiveProps(newProps: IProps) {
    if (newProps.taskLists !== this.state.taskLists) {
      this.setState({ taskLists: newProps.taskLists });
    }
  }

  clear() {
    this.setState({ taskLists: [] });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          {this.state.taskLists.length <= 0 && <div className="font-weight-bold text-center">Tasks list is empty</div>}

          {this.state.taskLists.map((value, index) => {
            return <div key={index} className="border m-3"> <TaskViewer task={value}></TaskViewer></div>
          })}

          <div className="d-flex">
            <button type="button" className="btn btn-success" onClick={this.reload.bind(this)}>Reload</button>
            <div className="flex-fill"></div>
            <button type="button" className="btn btn-danger" onClick={this.clear.bind(this)} disabled={this.state.taskLists.length <= 0}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TasksList;