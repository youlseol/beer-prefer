-- Create beers table
CREATE TABLE IF NOT EXISTS beers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  formats TEXT NOT NULL, -- JSON array of packaging formats
  description TEXT NOT NULL,
  flavor_profile TEXT NOT NULL, -- JSON array of flavor tags
  origin TEXT NOT NULL,
  alcohol_content REAL NOT NULL,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id TEXT NOT NULL UNIQUE,
  preferred_beer_types TEXT NOT NULL, -- JSON array
  preferred_formats TEXT NOT NULL, -- JSON array
  flavor_preferences TEXT, -- JSON array (optional)
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_beers_type ON beers(type);
CREATE INDEX IF NOT EXISTS idx_user_preferences_device_id ON user_preferences(device_id);
