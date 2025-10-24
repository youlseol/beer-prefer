import { Beer, BeerType, PackagingFormat } from '@shared/types/models';

const API_BASE_URL = 'http://localhost:3001/api';

interface RecommendationPreferences {
  types: BeerType[];
  formats: PackagingFormat[];
  flavors: string[];
  maxAbv: number;
}

export const beerService = {
  async getRecommendations(preferences: RecommendationPreferences): Promise<Beer[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/beers/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch recommendations');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },
};
