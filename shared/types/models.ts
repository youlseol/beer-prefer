export interface Beer {
  id: number;
  name: string;
  type: BeerType;
  formats: PackagingFormat[];
  description: string;
  flavor_profile: string[];
  origin: string;
  alcohol_content: number;
  image_url?: string;
}

export type BeerType = 'Lager' | 'Ale' | 'IPA' | 'Stout' | 'Pilsner' | 'Wheat Beer' | 'Porter' | 'Sour' | 'Other';

export type PackagingFormat = 'Bottle' | 'Can' | 'Draft';

export interface UserPreference {
  id?: number;
  device_id: string;
  preferred_beer_types: BeerType[];
  preferred_formats: PackagingFormat[];
  flavor_preferences?: string[];
  last_updated: string;
}

export interface FilterState {
  types: BeerType[];
  formats: PackagingFormat[];
}
