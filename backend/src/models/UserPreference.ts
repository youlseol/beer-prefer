import { UserPreference } from '../../../shared/types/models';
import db from '../config/database';

export class UserPreferenceModel {
  static getByDeviceId(deviceId: string): UserPreference | undefined {
    const stmt = db.prepare(`
      SELECT 
        id, device_id, preferred_beer_types, preferred_formats, 
        flavor_preferences, last_updated
      FROM user_preferences
      WHERE device_id = ?
    `);
    
    const pref = stmt.get(deviceId) as any;
    if (!pref) return undefined;
    
    return {
      ...pref,
      preferred_beer_types: JSON.parse(pref.preferred_beer_types),
      preferred_formats: JSON.parse(pref.preferred_formats),
      flavor_preferences: pref.flavor_preferences ? JSON.parse(pref.flavor_preferences) : [],
    };
  }

  static create(preference: Omit<UserPreference, 'id' | 'last_updated'>): UserPreference {
    const stmt = db.prepare(`
      INSERT INTO user_preferences (
        device_id, preferred_beer_types, preferred_formats, 
        flavor_preferences, last_updated
      )
      VALUES (?, ?, ?, ?, datetime('now'))
    `);
    
    const result = stmt.run(
      preference.device_id,
      JSON.stringify(preference.preferred_beer_types),
      JSON.stringify(preference.preferred_formats),
      JSON.stringify(preference.flavor_preferences || [])
    );
    
    return this.getById(Number(result.lastInsertRowid))!;
  }

  static update(id: number, preference: Partial<Omit<UserPreference, 'id' | 'device_id' | 'last_updated'>>): UserPreference | undefined {
    const updates: string[] = [];
    const params: any[] = [];

    if (preference.preferred_beer_types) {
      updates.push('preferred_beer_types = ?');
      params.push(JSON.stringify(preference.preferred_beer_types));
    }

    if (preference.preferred_formats) {
      updates.push('preferred_formats = ?');
      params.push(JSON.stringify(preference.preferred_formats));
    }

    if (preference.flavor_preferences !== undefined) {
      updates.push('flavor_preferences = ?');
      params.push(JSON.stringify(preference.flavor_preferences));
    }

    updates.push('last_updated = datetime(\'now\')');
    params.push(id);

    const stmt = db.prepare(`
      UPDATE user_preferences
      SET ${updates.join(', ')}
      WHERE id = ?
    `);
    
    stmt.run(...params);
    return this.getById(id);
  }

  static getById(id: number): UserPreference | undefined {
    const stmt = db.prepare(`
      SELECT 
        id, device_id, preferred_beer_types, preferred_formats, 
        flavor_preferences, last_updated
      FROM user_preferences
      WHERE id = ?
    `);
    
    const pref = stmt.get(id) as any;
    if (!pref) return undefined;
    
    return {
      ...pref,
      preferred_beer_types: JSON.parse(pref.preferred_beer_types),
      preferred_formats: JSON.parse(pref.preferred_formats),
      flavor_preferences: pref.flavor_preferences ? JSON.parse(pref.flavor_preferences) : [],
    };
  }
}
