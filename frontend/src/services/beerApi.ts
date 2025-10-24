import { apiClient } from './api';
import { Beer, BeerType, PackagingFormat } from '@shared/types/models';

export interface BeersResponse {
  data: Beer[];
  count: number;
}

export interface BeerResponse {
  data: Beer;
}

export class BeerApi {
  static async getAllBeers(types?: BeerType[], formats?: PackagingFormat[]): Promise<BeersResponse> {
    const params = new URLSearchParams();
    
    if (types && types.length > 0) {
      params.append('type', types.join(','));
    }
    
    if (formats && formats.length > 0) {
      params.append('format', formats.join(','));
    }
    
    const query = params.toString();
    const endpoint = query ? `/api/beers?${query}` : '/api/beers';
    
    return apiClient.get<BeersResponse>(endpoint);
  }

  static async getBeerById(id: number): Promise<BeerResponse> {
    return apiClient.get<BeerResponse>(`/api/beers/${id}`);
  }
}
