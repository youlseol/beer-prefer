import { Beer, BeerType, PackagingFormat } from '../../../shared/types/models';
import { BeerModel } from '../models/Beer';

export class BeerService {
  static getAllBeers(): Beer[] {
    try {
      return BeerModel.getAll();
    } catch (error) {
      console.error('Error fetching all beers:', error);
      throw new Error('Failed to fetch beers');
    }
  }

  static getBeerById(id: number): Beer | undefined {
    try {
      if (!id || id < 1) {
        throw new Error('Invalid beer ID');
      }
      return BeerModel.getById(id);
    } catch (error) {
      console.error(`Error fetching beer ${id}:`, error);
      throw error;
    }
  }

  static getBeersByType(types: BeerType[]): Beer[] {
    try {
      if (!types || types.length === 0) {
        return this.getAllBeers();
      }
      return BeerModel.getByFilters(types, undefined);
    } catch (error) {
      console.error('Error fetching beers by type:', error);
      throw new Error('Failed to fetch beers by type');
    }
  }

  static getBeersByFormat(formats: PackagingFormat[]): Beer[] {
    try {
      if (!formats || formats.length === 0) {
        return this.getAllBeers();
      }
      return BeerModel.getByFilters(undefined, formats);
    } catch (error) {
      console.error('Error fetching beers by format:', error);
      throw new Error('Failed to fetch beers by format');
    }
  }

  static getBeers(types?: BeerType[], formats?: PackagingFormat[]): Beer[] {
    try {
      if ((!types || types.length === 0) && (!formats || formats.length === 0)) {
        return this.getAllBeers();
      }
      return BeerModel.getByFilters(types, formats);
    } catch (error) {
      console.error('Error fetching beers with filters:', error);
      throw new Error('Failed to fetch beers with filters');
    }
  }

  static getRecommendations({
    types,
    formats,
    flavors,
    maxAbv,
  }: {
    types?: BeerType[];
    formats?: PackagingFormat[];
    flavors?: string[];
    maxAbv?: number;
  }): Beer[] {
    try {
      let recommendedBeers = BeerModel.getAll();

      if (types && types.length > 0) {
        recommendedBeers = recommendedBeers.filter(beer => types.includes(beer.type));
      }

      if (formats && formats.length > 0) {
        recommendedBeers = recommendedBeers.filter(beer =>
          beer.formats.some(format => formats.includes(format))
        );
      }

      if (flavors && flavors.length > 0) {
        recommendedBeers = recommendedBeers.filter(beer =>
          beer.flavor_profile.some(flavor => flavors.includes(flavor))
        );
      }

      if (maxAbv !== undefined && maxAbv > 0) {
        recommendedBeers = recommendedBeers.filter(beer => beer.alcohol_content <= maxAbv);
      }

      return recommendedBeers;
    } catch (error) {
      console.error('Error fetching beer recommendations:', error);
      throw new Error('Failed to fetch beer recommendations');
    }
  }
}
