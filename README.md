# 📋 Personal Task Tracker

A full-stack task management application built using **React**, **ASP.NET Core Web API**, and **SQLite**. The application allows users to securely manage their daily tasks with authentication, due date tracking, task filtering, and automated email reminders.

---

## 🚀 Features

- User Registration & Login
- Secure user-specific task management
- Create, edit and delete tasks
- Mark tasks as completed
- Task descriptions
- Automatic creation timestamp
- Calendar-based due date selection
- Search tasks by title or description
- Filter tasks by month
- Automatic email reminders using MailKit
- Background reminder service
- Responsive dark-themed UI using Bootstrap

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Axios
- Bootstrap
- React DatePicker

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- MailKit

---

## 📂 Project Structure

```
Personal Task Tracker Project
│
├── TaskTrackerApi        # ASP.NET Core Backend
│
└── task-tracker          # React Frontend
```

---

## ⚙️ Installation

### Backend

```bash
cd TaskTrackerApi
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
cd task-tracker
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5058
```

---

## ✉️ Email Reminder

The application continuously checks pending tasks using an ASP.NET Core Background Service.

When a task reaches its due date:

- An email reminder is automatically sent.
- The reminder is marked as sent.
- Duplicate reminder emails are prevented.

---

## 👨‍💻 Author

**Avanish Gaonkar**

National Institute of Technology Goa

Internship Project