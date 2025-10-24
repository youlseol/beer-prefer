import fs from 'fs';
import path from 'path';
import db from '../config/database';

const migrationsDir = path.join(__dirname, '../migrations');
const migrationFile = path.join(migrationsDir, '001_create_tables.sql');

console.log('Running database migrations...');

try {
  const sql = fs.readFileSync(migrationFile, 'utf8');
  
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    db.exec(statement);
  }

  console.log('✓ Migrations completed successfully');
  console.log('✓ Tables created: beers, user_preferences');
  console.log('✓ Indexes created for optimized queries');
  
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
}
