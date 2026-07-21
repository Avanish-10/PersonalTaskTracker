namespace TaskTrackerApi.Models;

public class TaskItem
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string Description { get; set; } = "";

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime? DueDate { get; set; }

    // Add this back temporarily
    public string Email { get; set; } = "";

    public bool ReminderSent { get; set; } = false;

    public int UserId { get; set; }

    public User? User { get; set; }
}