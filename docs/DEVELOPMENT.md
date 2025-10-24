# Development Guide

## Project Overview

The Beer Preference Discovery App is a full-stack application that helps users discover beers based on their preferences.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite with better-sqlite3
- **API**: RESTful API

## Project Structure

```
beer-prefer/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Data models (Beer, UserPreference)
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic
│   │   ├── scripts/        # Migration and seed scripts
│   │   ├── seeds/          # Seed data (beers.json)
│   │   ├── migrations/     # SQL migrations
│   │   └── server.ts       # Express server entry point
│   ├── data/               # SQLite database files (generated)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client services
│   │   ├── styles/         # CSS files
│   │   └── App.tsx         # Main application component
│   └── package.json
├── shared/
│   └── types/              # Shared TypeScript types
└── docs/                   # Documentation
```

## Development Workflow

### First-Time Setup

1. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Set Up Database**
   ```bash
   cd backend
   npm run migrate    # Create tables
   npm run seed       # Load 50 beers
   ```

3. **Configure Environment**
   ```bash
   # Backend: .env is already created from .env.example
   # Frontend: Create .env if needed
   cp frontend/.env.example frontend/.env
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The API will run on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The app will run on http://localhost:5173

### Available Scripts

#### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with beer data

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

### Beers

**GET /api/beers**
- Returns all beers
- Query params: `type` (comma-separated), `format` (comma-separated)
- Example: `/api/beers?type=IPA,Lager&format=Can`

**GET /api/beers/:id**
- Returns single beer by ID

**GET /health**
- Health check endpoint

### Future Endpoints (Not Yet Implemented)

**GET /api/preferences?device_id=xxx**
- Get user preferences

**POST /api/preferences**
- Save user preferences

**PUT /api/preferences/:id**
- Update user preferences

## Component Structure

### Frontend Components

- **App.tsx**: Main application with routing logic
- **BeerList.tsx**: Displays grid of beer cards with filtering
- **BeerCard.tsx**: Individual beer card component
- **BeerDetail.tsx**: Detailed beer information view

### Services

- **api.ts**: Base API client with fetch wrapper
- **beerApi.ts**: Beer-specific API methods

## Database Schema

### beers table
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- type (TEXT) - Lager, Ale, IPA, Stout, etc.
- formats (TEXT) - JSON array ["Bottle", "Can", "Draft"]
- description (TEXT)
- flavor_profile (TEXT) - JSON array of flavor tags
- origin (TEXT) - Country of origin
- alcohol_content (REAL) - ABV percentage
- image_url (TEXT) - Optional image URL
- created_at (DATETIME)
```

### user_preferences table (Structure defined, not yet used)
```sql
- id (INTEGER PRIMARY KEY)
- device_id (TEXT UNIQUE)
- preferred_beer_types (TEXT) - JSON array
- preferred_formats (TEXT) - JSON array
- flavor_preferences (TEXT) - JSON array
- last_updated (DATETIME)
- created_at (DATETIME)
```

## Adding New Beers

To add more beers to the database:

1. Edit `backend/src/seeds/beers.json`
2. Add new beer objects following the existing format
3. Run `npm run seed` (it will append to existing data)

Or manually insert via SQL:
```sql
INSERT INTO beers (name, type, formats, description, flavor_profile, origin, alcohol_content)
VALUES ('Beer Name', 'IPA', '["Can"]', 'Description', '["hoppy","bitter"]', 'USA', 6.5);
```

## Common Development Tasks

### Reset Database
```bash
cd backend
rm -rf data/
npm run migrate
npm run seed
```

### Check Database Contents
```bash
cd backend
sqlite3 data/beers.db
sqlite> SELECT COUNT(*) FROM beers;
sqlite> SELECT * FROM beers LIMIT 5;
sqlite> .exit
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:3001/health

# Get all beers
curl http://localhost:3001/api/beers

# Filter by type
curl "http://localhost:3001/api/beers?type=IPA,Stout"

# Get single beer
curl http://localhost:3001/api/beers/1
```

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use: `lsof -ti:3001 | xargs kill -9`
- Verify database exists: `ls backend/data/`
- Check logs for errors

### Frontend can't connect to API
- Verify backend is running on port 3001
- Check CORS configuration in backend/src/server.ts
- Verify API_URL in frontend (should be http://localhost:3001)

### Database errors
- Delete database and re-run migrations: `rm backend/data/beers.db && npm run migrate`
- Check SQLite installation: `sqlite3 --version`

## Code Style

- TypeScript strict mode enabled
- ESLint configured for React and TypeScript
- Use functional components with hooks
- Use CSS modules or separate CSS files
- Follow REST API naming conventions

## Git Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "Description"`
3. Push to remote: `git push origin feature/your-feature`
4. Create pull request

## Future Development

See tasks.md for planned features:
- User Story 2: Beer type filtering UI
- User Story 3: Packaging format filtering UI
- User Story 4: Combined filters
- User Story 5: Preference persistence
- Polish: Loading states, error handling, accessibility
