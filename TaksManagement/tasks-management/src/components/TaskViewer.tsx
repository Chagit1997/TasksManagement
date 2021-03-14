import React from 'react';
import { TasksTypes } from '../types/Task';


interface IState {
};

interface IProps {
  task: TasksTypes.TaskDetails
}

class TaskViewer extends React.Component<IProps, IState>  {

  constructor(props: IProps) {
    super(props);
  };

  render() {
    return (
      <div className="container p-3">
        <div className="d-flex">
          <div className="flex-fill">
            <div className="form-group">
              <label>Contetnt</label>
              <div>{this.props.task.taskContent}</div>
            </div>
            <div className="form-group">
              <label>Image name</label>
              <div>{this.props.task.imageName || 'No image'}</div>
            </div>
          </div>
          <div className="image-container d-flex border">
            <img src={this.props.task.imageData} />
            {!this.props.task.imageData && <div className="text-center flex-fill font-weight-bold">No image</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskViewer;