using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using static TaksManagement.Models.TaskModel;

namespace TaksManagement.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TasksApiController : ControllerBase
  {

    private static string SessionKey => "TasksList";
    private List<TaskDetails> TasksList
    {
      get
      {
        byte[] sessionValue;
        if (false == HttpContext.Session.TryGetValue(SessionKey, out sessionValue))
        {
          HttpContext.Session.SetString(SessionKey, JsonConvert.SerializeObject(new List<TaskDetails>()));
        }
        return JsonConvert.DeserializeObject<List<TaskDetails>>(HttpContext.Session.GetString(SessionKey));
      }
      set
      {
        HttpContext.Session.SetString(SessionKey, JsonConvert.SerializeObject(value));
      }
    }

    [HttpPost("SaveTask")]
    public Response.SaveTaskResponse SaveTask([FromBody] Request.SaveTaskRequest request)
    {
      if(string.IsNullOrEmpty(request.TaskDetails.TaskContent))
      {
        throw new System.Exception("Tasks content cannot be empty");
      }
      var tasks = TasksList;
      tasks.Add(request.TaskDetails);
      TasksList = tasks;
      return new Response.SaveTaskResponse();
    }

    [HttpGet("GetTasks")]
    public Response.GetTaskResponse GetAllTasks()
    {
      var response = new Response.GetTaskResponse()
      {
        Tasks = TasksList
      };
      return response;
    }

  }
}
