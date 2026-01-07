# Siruvapuri - Matrimonial Web Application

A modern, full-stack matrimonial web application built with React, Node.js, Express, and PostgreSQL. Features an intelligent matching algorithm, admin panel, and Docker deployment support.

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-v16+-blue)
![React](https://img.shields.io/badge/react-v19-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-v12+-blue)

## Features

### User Features
- **User Authentication** - Secure registration and login with JWT tokens
- **Profile Management** - Create and update detailed profiles with personal, educational, and professional information
- **Smart Matching Algorithm** - Personalized match recommendations based on preferences
- **Advanced Search** - Filter profiles by age, height, education, religion, location, and more
- **Interest Management** - Send and receive interests, accept or decline proposals
- **Profile Views** - Track who viewed your profile
- **Daily Recommendations** - Curated profile suggestions daily
- **Photo Upload** - AWS S3 integration for profile photos

### Admin Features
- **Dashboard Analytics** - Overview of users, matches, and activity
- **User Management** - Create, edit, and manage user accounts
- **Match Assignment** - Manually assign matches between users
- **Membership Management** - Handle user subscriptions and memberships
- **Interest Management** - Monitor and manage user interests
- **Password Management** - Reset and manage user passwords

### Technical Features
- Responsive design with TailwindCSS v4
- RESTful API architecture
- PostgreSQL database with optimized indexes
- JWT-based authentication
- Protected routes and middleware
- Input validation and sanitization
- Docker containerization
- Apache2 reverse proxy configuration
- AWS S3 for image storage
- Email notifications via Nodemailer

## Tech Stack

### Frontend (Client & Admin)
| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.2.0 | UI library |
| Vite | 7.2.4 | Build tool and dev server |
| TailwindCSS | 4.1.18 | Utility-first CSS framework |
| React Router DOM | 7.11.0 | Client-side routing |
| Axios | 1.13.2 | HTTP client |
| Framer Motion | 12.23.26 | Animations |
| Chart.js | 4.5.1 | Analytics charts |
| Lucide React | 0.562.0 | Icons |
| SweetAlert2 | 11.26.17 | Alert dialogs |

### Backend
| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | 16+ | Runtime environment |
| Express | 4.22.1 | Web framework |
| PostgreSQL | 8.11.3 (pg) | Relational database |
| bcryptjs | 2.4.3 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT authentication |
| AWS SDK | 3.958.0 | S3 image storage |
| Nodemailer | 7.0.12 | Email service |
| Multer | 1.4.5 | File uploads |

## Project Structure

```
siruvapuri/
├── client/                    # User-facing React app
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/           # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── ProfileView.jsx
│   │   │   └── Interests.jsx
│   │   └── utils/
│   │       └── api.js
│   ├── Dockerfile
│   └── package.json
│
├── admin/                     # Admin panel React app
│   ├── src/
│   │   └── pages/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminUserList.jsx
│   │       ├── AdminCreateUser.jsx
│   │       ├── AdminEditUser.jsx
│   │       ├── AdminMatches.jsx
│   │       ├── AdminAssignMatch.jsx
│   │       ├── AdminInterests.jsx
│   │       ├── AdminMembership.jsx
│   │       └── AdminAnalytics.jsx
│   ├── Dockerfile
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── config/
│   │   ├── database.js        # PostgreSQL connection
│   │   └── schema.sql         # Database schema
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── matchController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   └── validation.js      # Input validation
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── match.js
│   │   └── admin.js
│   ├── seed.js                # Database seeding
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml         # Docker orchestration
├── deploy.sh                  # One-step EC2 deployment
├── siruvapuri-apache.conf     # Apache reverse proxy config
└── README.md
```

## Quick Start

### Prerequisites
- Node.js v16 or higher
- PostgreSQL v12 or higher
- npm or yarn

### Local Development

**1. Clone the repository**
```bash
git clone https://github.com/webexcel/siruvapuri.git
cd siruvapuri
```

**2. Setup the database**
```bash
# Create database
psql -U postgres -c "CREATE DATABASE matrimonial_db;"

# Run schema
psql -U postgres -d matrimonial_db -f server/config/schema.sql
```

**3. Configure environment**
```bash
# Create server/.env
cp server/.env.example server/.env
# Edit with your database credentials and JWT secret
```

**4. Install dependencies and start**
```bash
# Backend
cd server && npm install && npm run dev

# Client (new terminal)
cd client && npm install && npm run dev

# Admin (new terminal)
cd admin && npm install && npm run dev
```

**5. Access the apps**
- Client: http://localhost:5173
- Admin: http://localhost:5174
- API: http://localhost:5000

### Docker Deployment

**One-step deployment on EC2:**
```bash
sudo ./deploy.sh
```

**Manual Docker commands:**
```bash
# Build and start all containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Environment Variables

### Server (.env)
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=matrimonial_db
JWT_SECRET=your_jwt_secret

# AWS S3 (for image uploads)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=your_bucket_name

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
```

### Client & Admin
```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/profile/update` | Update profile |
| GET | `/api/profile/:id` | Get profile by ID |
| PUT | `/api/profile/preferences` | Update preferences |
| GET | `/api/profile/preferences/get` | Get preferences |

### Matching
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/match/recommendations` | Get recommendations |
| GET | `/api/match/search` | Search profiles |
| POST | `/api/match/interest/send` | Send interest |
| GET | `/api/match/interest/received` | Get received interests |
| GET | `/api/match/interest/sent` | Get sent interests |
| PUT | `/api/match/interest/respond` | Respond to interest |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/users` | Get all users |
| POST | `/api/admin/users` | Create user |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/stats` | Get dashboard stats |

## Match Score Algorithm

The system calculates match scores based on:

| Criteria | Points |
|----------|--------|
| Age compatibility | 30 |
| Height preference | 20 |
| Education match | 15 |
| Religion match | 15 |
| Location preference | 10 |
| Marital status | 10 |

## Test Credentials

After running `node server/seed.js`:

**Male Account:**
- Email: `john.doe@example.com`
- Password: `password123`

**Female Account:**
- Email: `priya.sharma@example.com`
- Password: `password123`

## Deployment Architecture

```
                    ┌─────────────────┐
                    │   Apache2       │
                    │   (SSL + Proxy) │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│    Client     │   │     API       │   │    Admin      │
│  (Port 3000)  │   │  (Port 5000)  │   │  (Port 3001)  │
│    React      │   │   Node.js     │   │    React      │
└───────────────┘   └───────┬───────┘   └───────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  PostgreSQL   │
                    │   Database    │
                    └───────────────┘
```

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication with expiration
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration
- XSS and SQL injection prevention
- HTTPS with Let's Encrypt SSL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify credentials in `.env` file
- Check if database `matrimonial_db` exists

### Port Already in Use
- Change PORT in `server/.env` for backend
- Frontend port can be changed in `vite.config.js`

### Docker Issues
```bash
# View container logs
docker-compose logs -f api

# Rebuild containers
docker-compose up -d --build --force-recreate

# Reset everything
docker-compose down -v && docker-compose up -d --build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, create an issue in the repository or contact the development team.

---

**Made with React, Node.js, and PostgreSQL**
