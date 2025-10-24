import { Beer } from '@shared/types/models';
import '../styles/BeerCard.css';

interface BeerCardProps {
  beer: Beer;
  onClick: (id: number) => void;
}

export function BeerCard({ beer, onClick }: BeerCardProps) {
  return (
    <div className="beer-card" onClick={() => onClick(beer.id)}>
      <div className="beer-card-header">
        <h3>{beer.name}</h3>
        <span className="beer-type">{beer.type}</span>
      </div>
      
      <div className="beer-formats">
        {beer.formats.map((format) => (
          <span key={format} className="format-badge">
            {format}
          </span>
        ))}
      </div>
      
      <p className="beer-description">{beer.description}</p>
      
      <div className="beer-details">
        <span className="beer-origin">📍 {beer.origin}</span>
        <span className="beer-alcohol">{beer.alcohol_content}% ABV</span>
      </div>
      
      <div className="beer-flavors">
        {beer.flavor_profile.slice(0, 3).map((flavor) => (
          <span key={flavor} className="flavor-tag">
            {flavor}
          </span>
        ))}
      </div>
    </div>
  );
}
