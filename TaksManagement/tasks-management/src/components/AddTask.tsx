import React from 'react';
import { TasksTypes } from '../types/Task';

interface IState {
  taskContent: string;
  imageName: string;
  imageData: string | ArrayBuffer | null;
};

interface IProps {
  addTasks: Function;
}

class AddTask extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      taskContent: "chagit task - test",
      imageData: '',
      imageName: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event: any) {
    this.setState({ taskContent: event.target.value, imageName: this.state.imageName, imageData: this.state.imageData});
  }

  handleSubmit(event: any) {
    event.preventDefault();

    var request: TasksTypes.Request.SaveTaskRequest = {
      TaskDetails: { taskContent: this.state.taskContent, imgName: this.state.imageName, imgData: this.state.imageData } as TasksTypes.TaskDetails
    }

    fetch('api/TasksApi/SaveTask', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }).then(() => {
      this.props.addTasks(this.state);
      alert("Task added")
      this.setState({ taskContent: '', imageData: null, imageName: '' });
    }).catch(() => {
      alert("Server error")
    });
  }


  imageUploaded(event: any) {
    if (event.target.files.length > 1) {
      alert("Cannot upload multiple images");
      return;
    }

    var image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.setState({ taskContent: this.state.taskContent, imageData: reader.result, imageName: image.name });
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label>Task</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Task" value={this.state.taskContent} onChange={this.handleChange.bind(this)} required={true} maxLength={30} />
              </div>
            </div>
            <div className="form-group">
              <label>Image</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control image-uploader pointer" placeholder="Select your image" disabled={true} value={this.state.imageName} />
                <div className="input-group-append" onClick={() => document.getElementById("uploadFile")?.click()}>
                  <input type="file" id="uploadFile" accept="image/*" className="d-none" placeholder="Selsct your image" onChange={this.imageUploaded.bind(this)} />
                  <span className="input-group-text" id="basic-addon2">Browse</span>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <button type="submit" className="btn btn-success">Add</button>
              </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddTask;