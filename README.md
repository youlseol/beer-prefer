# Beer Preference Discovery App

A personal beer discovery application that helps users find beers matching their preferences based on type, packaging format, and flavor profiles.

## Project Structure

```
beer-prefer/
├── frontend/          # React + TypeScript frontend application
├── backend/           # Node.js + Express backend API
├── shared/            # Shared types and models
└── docs/              # Documentation
```

## Features

- Browse beers by type (Lager, Ale, IPA, Stout, etc.)
- Filter by packaging format (Bottle, Can)
- View detailed beer information
- Save and persist user preferences
- Combine multiple filters for refined discovery

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite
- **API**: RESTful API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Quick Start

1. **Clone and setup backend:**
   ```bash
   cd backend
   npm install
   npm run migrate  # Create database tables
   npm run seed     # Load 50 sample beers
   npm run dev      # Start backend on port 3001
   ```

2. **In a new terminal, setup frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev      # Start frontend on port 5173
   ```

3. **Open your browser:**
   - Navigate to http://localhost:5173
   - Browse 50 beers across multiple types and formats
   - Click any beer to see detailed information

## Current Features (MVP - User Story 1)

✅ **Completed:**
- Browse all beers in a responsive grid layout
- View detailed information for each beer
- See beer type, origin, alcohol content, and flavor profiles
- Filter by packaging format (Bottle, Can, Draft)
- Smooth navigation between list and detail views
- 50 pre-loaded beers covering Lagers, Ales, IPAs, Stouts, Wheat Beers, and more

## Upcoming Features

See [.specify/features/.../tasks.md](.specify/features/라거-에일-병-맥주-캔-맥주-맥주-종류-별-본인-취향에-맞는-맥주를-선택할-수-있고-찾아주-20251024-085116/tasks.md) for the complete implementation plan:
- User Story 2: Beer type filtering UI
- User Story 3: Packaging format filtering UI  
- User Story 4: Combined multiple filters
- User Story 5: User preference persistence across sessions
- Polish: Enhanced loading states, error handling, accessibility features

## Development

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for detailed development instructions.

## API Documentation

See [docs/api.md](docs/api.md) for API endpoint documentation.

## Project Status

**Phase 1-3 Complete:** MVP is fully functional with core beer discovery features.  
**Next Phase:** Implementing filter UI components (User Stories 2-4).
