# Learning Management System (LMS) – Internship Assignment

A role-based Learning Management System built using Node.js, Express, MongoDB, and React (Vite + TypeScript).
The system supports Admin, Mentor, and Student roles, enforcing JWT-based authentication and RBAC at the backend.

Note - My Frontend is not upto date yet because of lack of time but my backend code is accoridng to the requirements. 

🚀 Tech Stack
Backend
-Node.js
-Express.js
-TypeScript
-MongoDB (Atlas)
-Mongoose
-JWT Authentication
-bcrypt
-PDFKit (Certificate Generation)

🔐 Authentication & Authorization

-JWT-based authentication
-JWT payload contains:
-userId
-role (student | mentor | admin)
-Role-Based Access Control (RBAC) enforced at:
-API level (middleware)
-Unauthorized access returns proper 401 / 403 responses

👥 User Roles & Permissions
🧑‍🎓 Student

Register & Login

View assigned courses

Complete chapters sequentially

Track course progress

Download certificate after 100% completion

🧑‍🏫 Mentor

Login after admin approval

Create, update, delete courses

Add chapters to courses

View own courses only

👨‍💼 Admin

View all users

Create mentors & admins

Approve mentors

Delete users

API Endpoints
🔑 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Student registration
POST	/api/auth/login	Login (all roles)
👤 User Management (Admin)
Method	Endpoint	Description
GET	/api/users	Get all users
POST	/api/users/create-mentor	Create mentor
PUT	/api/users/:id/approve-mentor	Approve mentor
DELETE	/api/users/:id	Delete user
📚 Course Management (Mentor)
Method	Endpoint	Description
POST	/api/courses	Create course
GET	/api/courses/my	Get mentor’s courses
PUT	/api/courses/:id	Update course
DELETE	/api/courses/:id	Delete course
📖 Chapter Management (Mentor)
Method	Endpoint	Description
POST	/api/courses/:id/chapters	Add chapter
GET	/api/courses/:id/chapters	Get course chapters
PUT	/api/chapters/:id	Update chapter
DELETE	/api/chapters/:id	Delete chapter
📊 Progress Tracking (Student)
Method	Endpoint	Description
POST	/api/progress/:chapterId/complete	Mark chapter complete
GET	/api/progress/my	View progress

✔ Chapters must be completed sequentially
✔ Progress stored chapter-wise
✔ Completion % auto-calculated

🎓 Certificate
Method	Endpoint	Description
GET	/api/certificates/:courseId	Download course certificate

✔ Unlocked only after 100% course completion
✔ Generated dynamically as PDF

backend/
 └── src/
     ├── config/
     ├── controllers/
     ├── middleware/
     ├── models/
     ├── routes/
     ├── utils/
     ├── app.ts
     └── server.ts


⚙️ Environment Variables
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

🧪 Testing
-All APIs tested using Postman
-Role-based access verified using different JWT tokens
-Edge cases handled (unauthorized access, invalid credentials)

🚀 Deployment
-Backend: https://internship-project-lakn.onrender.com

🤖 AI Usage & Transparency
This project was developed with responsible and transparent use of AI tools, as permitted by the internship guidelines.

Developer Contributions
-All backend architecture, APIs, authentication, RBAC logic, database models, and business rules were designed and implemented manually., though help of AI was taken at some places for syntax checking and error debugging.

All AI-generated code was:
-Reviewed
-Modified where required
-Tested thoroughly using Postman and browser-based testing




