using System.Collections.Generic;

namespace TaksManagement.Models
{
  public class TaskModel
  {

    public class TaskDetails
    {
      public string TaskContent { get; set; }
      public string ImgName { get; set; }
      public string ImgData { get; set; }
    }

    public class Request
    {
      public class SaveTaskRequest
      {
        public TaskDetails TaskDetails { get; set; }
      }

      public class GetTaskRequest
      {

      }
    }

    public class Response
    {
      public class SaveTaskResponse
      {

      }

      public class GetTaskResponse
      {
        public List<TaskDetails> Tasks { get; set; }
      }

    }

  }


}
