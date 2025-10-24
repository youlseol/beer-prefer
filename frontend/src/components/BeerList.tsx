import { Beer } from '@shared/types/models';
import { BeerCard } from './BeerCard';
import '../styles/BeerList.css';

interface BeerListProps {
  beers: Beer[];
  onBeerSelect: (id: number) => void;
  onReset: () => void;
}

export function BeerList({ beers, onBeerSelect, onReset }: BeerListProps) {
  if (beers.length === 0) {
    return (
      <div className="beer-list-container">
        <div className="no-results">
          <h2>No beers match your preferences</h2>
          <p>Try adjusting your answers in the quiz.</p>
          <button onClick={onReset} className="reset-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="beer-list-container">
      <header className="beer-list-header">
        <h1>Your Recommended Beers</h1>
        <p className="beer-count">
          Found {beers.length} beer{beers.length !== 1 ? 's' : ''} for you
        </p>
        <button onClick={onReset} className="reset-button-sm">
          Start Over
        </button>
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
