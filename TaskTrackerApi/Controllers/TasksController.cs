using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTrackerApi.Data;
using TaskTrackerApi.Models;
using TaskTrackerApi.Services;
namespace TaskTrackerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;
private readonly EmailService _emailService;

   public TasksController(
    AppDbContext context,
    EmailService emailService)
{
    _context = context;
    _emailService = emailService;
}

    // GET: api/tasks
    [HttpGet]
public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(
    [FromHeader(Name = "userId")] int userId)
{
    var tasks = await _context.Tasks
        .Where(t => t.UserId == userId)
        .ToListAsync();

    return Ok(tasks);
}

    // GET: api/tasks/1
    [HttpGet("{id}")]
public async Task<ActionResult<TaskItem>> GetTask(
    int id,
    [FromHeader(Name = "userId")] int userId)
{
    var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

    if (task == null)
    {
        return NotFound();
    }

    return Ok(task);
}

    // POST: api/tasks
[HttpPost]
public async Task<ActionResult<TaskItem>> CreateTask(
    [FromBody] CreateTaskDto dto,
    [FromHeader(Name = "userId")] int userId)
{
    var user = await _context.Users.FindAsync(userId);

    if (user == null)
    {
        return BadRequest("Invalid user.");
    }

    var task = new TaskItem
    {
        Title = dto.Title,
        Description = dto.Description,
        DueDate = dto.DueDate,
        CreatedAt = DateTime.Now,
        Email = user.Email,
        ReminderSent = false,
        UserId = user.Id
    };

    _context.Tasks.Add(task);
    await _context.SaveChangesAsync();

   return Ok(new
{
    Message = "Task created successfully",
    TaskId = task.Id
});
}

    // PUT: api/tasks/1
    [HttpPut("{id}")]
public async Task<IActionResult> UpdateTask(
    int id,
    TaskItem updatedTask,
    [FromHeader(Name = "userId")] int userId)
{
    var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

    if (task == null)
    {
        return NotFound();
    }

    task.Title = updatedTask.Title;
    task.Description = updatedTask.Description;
    task.IsCompleted = updatedTask.IsCompleted;
    task.DueDate = updatedTask.DueDate;

    await _context.SaveChangesAsync();

    return NoContent();
}

    // DELETE: api/tasks/1
   [HttpDelete("{id}")]
public async Task<IActionResult> DeleteTask(
    int id,
    [FromHeader(Name = "userId")] int userId)
{
    var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

    if (task == null)
    {
        return NotFound();
    }

    _context.Tasks.Remove(task);

    await _context.SaveChangesAsync();

    return NoContent();
}

    [HttpPost("sendReminder/{id}")]
public async Task<IActionResult> SendReminder(
    int id,
    [FromHeader(Name = "userId")] int userId)
{
    var task = await _context.Tasks
        .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

    if (task == null)
    {
        return NotFound();
    }

    await _emailService.SendEmailAsync(
        task.Email,
        task.Title,
        task.DueDate ?? DateTime.Now
    );

    return Ok("Reminder Sent");
}


}


