import fs from 'fs';
import path from 'path';
import db from '../config/database';

const seedFile = path.join(__dirname, '../seeds/beers.json');

console.log('Seeding database with beer data...');

try {
  const beersData = JSON.parse(fs.readFileSync(seedFile, 'utf8'));
  
  const stmt = db.prepare(`
    INSERT INTO beers (name, type, formats, description, flavor_profile, origin, alcohol_content, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((beers: any[]) => {
    for (const beer of beers) {
      stmt.run(
        beer.name,
        beer.type,
        JSON.stringify(beer.formats),
        beer.description,
        JSON.stringify(beer.flavor_profile),
        beer.origin,
        beer.alcohol_content,
        beer.image_url || null
      );
    }
  });

  insertMany(beersData);

  console.log(`✓ Successfully seeded ${beersData.length} beers`);
  
  const count = db.prepare('SELECT COUNT(*) as count FROM beers').get() as { count: number };
  console.log(`✓ Total beers in database: ${count.count}`);
  
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
