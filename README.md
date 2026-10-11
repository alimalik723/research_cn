# UniResearch Portal 🎓

**A centralized platform for managing university research opportunities.**

UniResearch Portal is a web-based application designed to connect students with research opportunities offered by university faculty members. It replaces scattered announcements across emails, messaging groups, and noticeboards with a centralized, searchable platform.

The system provides a structured way for faculty members to publish, update, and manage research opportunities while helping students discover projects that match their academic interests and technical skills.

## ✨ Key Features

### Frontend
- **Modern interface:** Responsive React application built with Vite.
- **Centralized dashboard:** View research opportunities in one place.
- **Opportunity discovery:** Browse and search opportunities by title, research area, department, or required skills.
- **Opportunity details:** Display descriptions, faculty information, available positions, deadlines, and status.
- **Filtering and sorting:** Narrow results by research area, department, or Open/Closed status.
- **Responsive design:** Support desktop, tablet, and mobile screens.
- **Loading and error states:** Display useful feedback when data is loading or an API request fails.
- **Empty states:** Show a helpful message when no opportunities match the selected filters.

### Backend
- **RESTful API:** Endpoints for managing research opportunities.
- **CRUD operations:** Create, read, update, and delete opportunities.
- **Database integration:** Store opportunity information persistently.
- **Input validation:** Validate required fields and incoming data.
- **Error handling:** Return meaningful HTTP status codes and error messages.
- **CORS configuration:** Allow the frontend to communicate with the backend during local development.

### Research Opportunity Information

Each opportunity can contain:

- Unique opportunity ID
- Research title
- Description
- Research area
- Faculty member name
- Department
- Required skills
- Number of available positions
- Application deadline
- Status: Open or Closed

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Development server | Vite |
| Frontend language | JavaScript / JSX |
| Backend | Node.js and Express.js |
| API style | REST |
| Database | MySQL |
| API testing | Postman |
| Version control | Git and GitHub |

*Update this list if the implementation uses different technologies.*

## 📁 Project Structure

```text
research_cn/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

*This is the recommended structure. Keep your existing folder and file names if they differ.*

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js (an active LTS version recommended)
- npm
- MySQL Server
- Git
- A code editor such as Visual Studio Code

Verify the installations:

```bash
node --version
npm --version
git --version
```

## 🚀 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/alimalik723/research_cn.git
cd research_cn
```

### 2. Configure the backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Create the backend environment file from the provided example:

```bash
cp .env.example .env
```

Configure your database credentials and server port in `backend/.env`. Use the variable names expected by your backend code.

Example configuration:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=research_portal
```

**Security:** Replace the example values with your local configuration. Never commit real credentials to GitHub.

Create the database in MySQL if your project does not already create it automatically:

```sql
CREATE DATABASE research_portal;
```

Run your project's existing schema or migration script to create the required tables.

Start the backend using the script defined in `backend/package.json`:

```bash
npm run dev
```

If your backend does not define a `dev` script, check its available scripts:

```bash
npm run
```

Use the configured start command instead, such as `npm start`, if that is what your project supports.

### 3. Configure the frontend

Open a **second terminal** in the project root:

```bash
cd frontend
npm install
```

Create the frontend environment file:

```bash
cp .env.example .env
```

For a Vite frontend, configure the API URL using the variable name expected by your application. For example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal. Open that URL in your browser, commonly:

```text
http://localhost:5173
```

Keep both terminal sessions running while using the application.

> **Important:** These commands assume the frontend and backend each have their own `package.json`. Check your repository structure and scripts before running them.

## 🔌 API Documentation

The following is the recommended API contract for research opportunities. Confirm that the routes match your implemented backend.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/opportunities` | Retrieve all opportunities |
| GET | `/api/opportunities/:id` | Retrieve one opportunity |
| POST | `/api/opportunities` | Create an opportunity |
| PUT | `/api/opportunities/:id` | Update an opportunity |
| DELETE | `/api/opportunities/:id` | Delete an opportunity |

### Example: Create an opportunity

**Request**

```http
POST /api/opportunities
Content-Type: application/json
```

```json
{
  "title": "Artificial Intelligence Research",
  "description": "Explore machine learning and intelligent systems.",
  "researchArea": "Artificial Intelligence",
  "facultyName": "Dr. Example",
  "department": "Computer Science",
  "requiredSkills": ["Python", "Machine Learning"],
  "availablePositions": 3,
  "applicationDeadline": "2026-12-15",
  "status": "Open"
}
```

The field names above are illustrative. Adjust them to the schema your backend actually accepts.

### Recommended HTTP status codes

- `200 OK` — Request completed successfully.
- `201 Created` — Opportunity created successfully.
- `400 Bad Request` — Invalid input.
- `404 Not Found` — Opportunity does not exist.
- `500 Internal Server Error` — Unexpected server error.

## 🧪 Testing

### Backend API

Use Postman to test the implemented endpoints.

1. Start the backend server.
2. Send a GET request to `http://localhost:5000/api/opportunities`.
3. Test creating a record with a POST request.
4. Retrieve the new record using GET.
5. Update it using PUT.
6. Delete it using DELETE.
7. Verify the database reflects the changes.

### Frontend

- Verify the application opens successfully.
- Confirm opportunities load from the real backend.
- Test search, filters, and opportunity details.
- Test loading, empty, and error states.
- Verify create, update, and delete actions if those features are available in the UI.
- Check responsive layouts at different screen sizes.

## 🔒 Security and Configuration

- Keep database credentials in environment variables.
- Do not commit `.env` files containing secrets.
- Validate incoming request data on the backend.
- Use parameterized database queries.
- Configure CORS for the intended frontend origin.
- Do not expose database credentials to frontend code.
- Restrict faculty management operations to authorized users if authentication is implemented.

## 🗺️ Future Improvements

The following features are recommended for future development:

- Student accounts and faculty authentication.
- Student applications and application status tracking.
- Application deadline reminders.
- Faculty dashboards and research analytics.
- Pagination for large opportunity lists.
- Advanced search by skills, department, and research area.
- Automated backend tests and frontend component tests.
- Deployment monitoring and production environment configuration.

These are planned enhancements, not claims that they are already implemented.

## 👨‍💻 Development Workflow

When contributing to the project:

1. Pull the latest changes from the repository.
2. Create a separate branch for significant changes.
3. Implement and test the changes locally.
4. Verify that frontend requests work against the backend.
5. Review the changes before committing.
6. Push the branch to GitHub.

Example Git commands:

```bash
git status
git add README.md
git commit -m "docs: improve project README"
git push origin main
```

Use your actual working branch if it is not `main`.

## 📄 License

Add a license appropriate for your project before distributing or reusing it publicly.

---

**Project:** UniResearch Portal  
**Repository:** https://github.com/alimalik723/research_cn.git  
**Purpose:** Centralized university research opportunity management
