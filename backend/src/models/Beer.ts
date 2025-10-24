import { Beer } from '../../../shared/types/models';
import db from '../config/database';

export class BeerModel {
  static getAll(): Beer[] {
    const stmt = db.prepare(`
      SELECT 
        id, name, type, formats, description, 
        flavor_profile, origin, alcohol_content, image_url
      FROM beers
    `);
    
    const beers = stmt.all() as any[];
    return beers.map(beer => ({
      ...beer,
      formats: JSON.parse(beer.formats),
      flavor_profile: JSON.parse(beer.flavor_profile),
    }));
  }

  static getById(id: number): Beer | undefined {
    const stmt = db.prepare(`
      SELECT 
        id, name, type, formats, description, 
        flavor_profile, origin, alcohol_content, image_url
      FROM beers
      WHERE id = ?
    `);
    
    const beer = stmt.get(id) as any;
    if (!beer) return undefined;
    
    return {
      ...beer,
      formats: JSON.parse(beer.formats),
      flavor_profile: JSON.parse(beer.flavor_profile),
    };
  }

  static getByFilters(types?: string[], formats?: string[]): Beer[] {
    let query = `
      SELECT 
        id, name, type, formats, description, 
        flavor_profile, origin, alcohol_content, image_url
      FROM beers
      WHERE 1=1
    `;
    const params: any[] = [];

    if (types && types.length > 0) {
      const placeholders = types.map(() => '?').join(',');
      query += ` AND type IN (${placeholders})`;
      params.push(...types);
    }

    if (formats && formats.length > 0) {
      const formatConditions = formats.map(() => 'formats LIKE ?').join(' OR ');
      query += ` AND (${formatConditions})`;
      params.push(...formats.map(f => `%"${f}"%`));
    }

    const stmt = db.prepare(query);
    const beers = stmt.all(...params) as any[];
    
    return beers.map(beer => ({
      ...beer,
      formats: JSON.parse(beer.formats),
      flavor_profile: JSON.parse(beer.flavor_profile),
    }));
  }

  static create(beer: Omit<Beer, 'id'>): Beer {
    const stmt = db.prepare(`
      INSERT INTO beers (name, type, formats, description, flavor_profile, origin, alcohol_content, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      beer.name,
      beer.type,
      JSON.stringify(beer.formats),
      beer.description,
      JSON.stringify(beer.flavor_profile),
      beer.origin,
      beer.alcohol_content,
      beer.image_url || null
    );
    
    return this.getById(Number(result.lastInsertRowid))!;
  }
}
