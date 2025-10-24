import { useState, useEffect } from 'react';
import { Beer } from '@shared/types/models';
import { BeerCard } from './BeerCard';
import '../styles/BeerList.css';

interface BeerListProps {
  onBeerSelect: (id: number) => void;
}

export function BeerList({ onBeerSelect }: BeerListProps) {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBeers();
  }, []);

  const fetchBeers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetch('http://localhost:3001/api/beers').then(res => res.json());
      setBeers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="beer-list-container">
        <div className="loading">Loading beers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="beer-list-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchBeers} className="retry-button">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="beer-list-container">
      <header className="beer-list-header">
        <h1>🍺 Beer Preference Discovery</h1>
        <p className="beer-count">Showing {beers.length} beer{beers.length !== 1 ? 's' : ''}</p>
      </header>
      
      <div className="beer-grid" role="list">
        {beers.map((beer) => (
          <div key={beer.id} role="listitem">
            <BeerCard beer={beer} onClick={onBeerSelect} />
          </div>
        ))}
      </div>
      
      {beers.length > 10 && (
        <div className="scroll-hint">
          Scroll to see more beers ↓
        </div>
      )}
    </div>
  );
}
