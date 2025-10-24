# Beer Preference Discovery API Documentation

Base URL: `http://localhost:3001`

## Endpoints

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Beer Preference Discovery API is running"
}
```

### Beer Endpoints

#### Get All Beers

**GET** `/api/beers`

Get all beers with optional filtering.

**Query Parameters:**
- `type` (optional): Filter by beer type (comma-separated). Example: `?type=Lager,Ale`
- `format` (optional): Filter by packaging format (comma-separated). Example: `?format=Bottle,Can`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Classic Lager",
      "type": "Lager",
      "formats": ["Bottle", "Can"],
      "description": "A crisp and refreshing lager",
      "flavor_profile": ["crisp", "clean", "refreshing"],
      "origin": "Germany",
      "alcohol_content": 4.5,
      "image_url": "https://example.com/beer.jpg"
    }
  ],
  "count": 1
}
```

#### Get Beer by ID

**GET** `/api/beers/:id`

Get detailed information about a specific beer.

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Classic Lager",
    "type": "Lager",
    "formats": ["Bottle", "Can"],
    "description": "A crisp and refreshing lager",
    "flavor_profile": ["crisp", "clean", "refreshing"],
    "origin": "Germany",
    "alcohol_content": 4.5,
    "image_url": "https://example.com/beer.jpg"
  }
}
```

### Preference Endpoints

#### Get User Preferences

**GET** `/api/preferences`

Get user preferences by device ID.

**Query Parameters:**
- `device_id` (required): Unique device identifier

**Response:**
```json
{
  "data": {
    "id": 1,
    "device_id": "abc-123",
    "preferred_beer_types": ["Lager", "IPA"],
    "preferred_formats": ["Can"],
    "flavor_preferences": ["hoppy", "bitter"],
    "last_updated": "2025-10-24T12:00:00Z"
  }
}
```

#### Save User Preferences

**POST** `/api/preferences`

Save new user preferences.

**Request Body:**
```json
{
  "device_id": "abc-123",
  "preferred_beer_types": ["Lager", "IPA"],
  "preferred_formats": ["Can"],
  "flavor_preferences": ["hoppy", "bitter"]
}
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "device_id": "abc-123",
    "preferred_beer_types": ["Lager", "IPA"],
    "preferred_formats": ["Can"],
    "flavor_preferences": ["hoppy", "bitter"],
    "last_updated": "2025-10-24T12:00:00Z"
  },
  "message": "Preferences saved successfully"
}
```

#### Update User Preferences

**PUT** `/api/preferences/:id`

Update existing user preferences.

**Request Body:**
```json
{
  "preferred_beer_types": ["Ale", "Stout"],
  "preferred_formats": ["Bottle"],
  "flavor_preferences": ["malty", "smooth"]
}
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "device_id": "abc-123",
    "preferred_beer_types": ["Ale", "Stout"],
    "preferred_formats": ["Bottle"],
    "flavor_preferences": ["malty", "smooth"],
    "last_updated": "2025-10-24T13:00:00Z"
  },
  "message": "Preferences updated successfully"
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error
