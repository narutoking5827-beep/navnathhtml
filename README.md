# Smart Student Management System (SSMS)

A comprehensive web-based student management system built with vanilla HTML/CSS/JavaScript frontend, Node.js/Express backend, and PostgreSQL database.

## Features

### Admin Features
- Dashboard with statistics
- User management (Create, view, delete users)
- Student management
- Teacher management
- Course management
- Generate attendance and marks reports
- Send notifications to all users or specific roles

### Teacher Features
- Dashboard with course statistics
- View assigned courses and students
- Mark attendance
- Create assignments
- Grade student submissions
- Enter exam marks
- Send notifications to students

### Student Features
- Dashboard with attendance percentage and recent marks
- View and update profile
- View attendance records by course
- View enrolled courses
- Submit assignments
- View marks and grades
- Receive notifications
- Submit feedback

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT + bcrypt
- **Version Control**: Git

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
The `.env` file should already contain your Supabase credentials:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

3. Start the backend server:
```bash
npm run server
```
The server will run on http://localhost:3000

4. In another terminal, start the frontend:
```bash
npm run dev
```
The frontend will run on http://localhost:5173

5. Access the application:
Open http://localhost:5173 in your browser

## Default Login Credentials

You'll need to create users through the Admin panel. First, you need to manually insert an admin user into the database.

## Project Structure

```
project/
├── server/
│   ├── server.js              # Express server entry point
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   └── routes/
│       ├── auth.js           # Authentication routes
│       ├── admin.js          # Admin routes
│       ├── teacher.js        # Teacher routes
│       └── student.js        # Student routes
├── public/
│   ├── login.html            # Login page
│   ├── admin-dashboard.html  # Admin dashboard
│   ├── teacher-dashboard.html # Teacher dashboard
│   ├── student-dashboard.html # Student dashboard
│   ├── css/
│   │   └── dashboard.css     # Dashboard styles
│   └── js/
│       ├── auth.js           # Auth utilities
│       ├── admin.js          # Admin functionality
│       ├── teacher.js        # Teacher functionality
│       └── student.js        # Student functionality
└── package.json
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- GET `/api/auth/me` - Get current user

### Admin
- GET `/api/admin/dashboard` - Dashboard statistics
- GET `/api/admin/users` - List all users
- POST `/api/admin/users` - Create new user
- PUT `/api/admin/users/:id` - Update user
- DELETE `/api/admin/users/:id` - Delete user
- GET `/api/admin/students` - List all students
- GET `/api/admin/teachers` - List all teachers
- GET `/api/admin/courses` - List all courses
- POST `/api/admin/notifications` - Send notification
- GET `/api/admin/reports/attendance` - Attendance report
- GET `/api/admin/reports/marks` - Marks report

### Teacher
- GET `/api/teacher/dashboard` - Dashboard statistics
- GET `/api/teacher/courses` - My courses
- POST `/api/teacher/attendance` - Mark attendance
- GET `/api/teacher/attendance/:courseId` - View attendance
- POST `/api/teacher/assignments` - Create assignment
- GET `/api/teacher/assignments` - My assignments
- GET `/api/teacher/submissions/:assignmentId` - View submissions
- PUT `/api/teacher/submissions/:id/grade` - Grade submission
- POST `/api/teacher/marks` - Enter marks
- GET `/api/teacher/marks/:courseId` - View marks
- GET `/api/teacher/students/:courseId` - Course students

### Student
- GET `/api/student/dashboard` - Dashboard statistics
- GET `/api/student/profile` - My profile
- PUT `/api/student/profile` - Update profile
- GET `/api/student/attendance` - My attendance
- GET `/api/student/courses` - My courses
- GET `/api/student/assignments` - My assignments
- POST `/api/student/submissions` - Submit assignment
- GET `/api/student/marks` - My marks
- GET `/api/student/notifications` - My notifications
- POST `/api/student/feedback` - Submit feedback

## Database Schema

The system uses PostgreSQL with the following main tables:
- `users` - User authentication and basic info
- `students` - Extended student profiles
- `teachers` - Extended teacher profiles
- `courses` - Course/subject information
- `attendance` - Attendance records
- `assignments` - Assignment details
- `submissions` - Student submissions
- `marks` - Exam marks/grades
- `notifications` - System notifications
- `feedback` - Student feedback

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- Role-based access control (RBAC)
- Row Level Security (RLS) on database

## License

MIT
# navnath
