using Microsoft.EntityFrameworkCore;
using TaskTrackerApi.Data;

namespace TaskTrackerApi.Services;

public class ReminderService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public ReminderService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var emailService = scope.ServiceProvider.GetRequiredService<EmailService>();

            var tasks = await context.Tasks
                .Where(t =>
                    !t.ReminderSent &&
                    t.DueDate != null &&
                    t.DueDate <= DateTime.Now)
                .ToListAsync();

            foreach (var task in tasks)
            {
                try
                {
                    await emailService.SendEmailAsync(
                        task.Email,
                        task.Title,
                        task.DueDate!.Value);

                    task.ReminderSent = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            await context.SaveChangesAsync();

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}