﻿export namespace TasksTypes {


  export interface TaskDetails {
    taskContent: string;
    imageName: string;
    imageData: string;
  };

  export module Request {
    export interface SaveTaskRequest {
      TaskDetails: TaskDetails;
    };
  }

  export module Response {
    export interface GetTaskResponse {
      tasks: TaskDetails[];
    };

  }

}
