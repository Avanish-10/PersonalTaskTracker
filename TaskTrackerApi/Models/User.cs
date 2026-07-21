using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace TaskTrackerApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        public string PasswordHash { get; set; } = "";

        // Navigation Property
       [JsonIgnore]
public List<TaskItem> Tasks { get; set; } = new();
    }
}