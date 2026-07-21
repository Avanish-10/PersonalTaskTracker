using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace TaskTrackerApi.Services;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string title, DateTime dueDate)
    {
        var message = new MimeMessage();

        message.From.Add(new MailboxAddress(
            "Personal Task Tracker",
            _configuration["EmailSettings:SenderEmail"]));

        message.To.Add(MailboxAddress.Parse(toEmail));

        message.Subject = "Task Reminder";

        message.Body = new TextPart("plain")
        {
            Text =
$@"Hello,

⏰ This is an automatic reminder from Personal Task Tracker.

Task Title:
{title}

Due Date:
{dueDate:dddd, dd MMMM yyyy hh:mm tt}

Please complete your task before the deadline.

Have a productive day!

Regards,
Personal Task Tracker
"
        };

        using var client = new SmtpClient();

        await client.ConnectAsync(
            "smtp.gmail.com",
            587,
            SecureSocketOptions.StartTls);

        await client.AuthenticateAsync(
            _configuration["EmailSettings:SenderEmail"],
            _configuration["EmailSettings:SenderPassword"]);

        await client.SendAsync(message);

        await client.DisconnectAsync(true);
    }
}