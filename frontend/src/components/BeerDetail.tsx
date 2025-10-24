import { useState, useEffect } from 'react';
import { Beer } from '../../../shared/types/models';
import '../styles/BeerDetail.css';

interface BeerDetailProps {
  beerId: number;
  onBack: () => void;
}

export function BeerDetail({ beerId, onBack }: BeerDetailProps) {
  const [beer, setBeer] = useState<Beer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBeer();
  }, [beerId]);

  const fetchBeer = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3001/api/beers/${beerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch beer details');
      }
      
      const data = await response.json();
      setBeer(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="beer-detail-container">
        <div className="loading">Loading beer details...</div>
      </div>
    );
  }

  if (error || !beer) {
    return (
      <div className="beer-detail-container">
        <div className="error">
          <p>{error || 'Beer not found'}</p>
          <button onClick={onBack} className="back-button">← Back to List</button>
        </div>
      </div>
    );
  }

  return (
    <div className="beer-detail-container">
      <button onClick={onBack} className="back-button">← Back to List</button>
      
      <div className="beer-detail-card">
        <div className="beer-detail-header">
          <div>
            <h1>{beer.name}</h1>
            <div className="beer-meta">
              <span className="beer-type-large">{beer.type}</span>
              <span className="beer-origin-large">📍 {beer.origin}</span>
            </div>
          </div>
          {beer.image_url && (
            <img src={beer.image_url} alt={beer.name} className="beer-image" />
          )}
          {!beer.image_url && (
            <div className="beer-image-placeholder">🍺</div>
          )}
        </div>

        <div className="beer-detail-section">
          <h2>Description</h2>
          <p>{beer.description}</p>
        </div>

        <div className="beer-detail-section">
          <h2>Details</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Alcohol Content</span>
              <span className="detail-value">{beer.alcohol_content}% ABV</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Type</span>
              <span className="detail-value">{beer.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Origin</span>
              <span className="detail-value">{beer.origin}</span>
            </div>
          </div>
        </div>

        <div className="beer-detail-section">
          <h2>Available Formats</h2>
          <div className="formats-large">
            {beer.formats.map((format) => (
              <span key={format} className="format-badge-large">
                {format}
              </span>
            ))}
          </div>
        </div>

        <div className="beer-detail-section">
          <h2>Flavor Profile</h2>
          <div className="flavors-large">
            {beer.flavor_profile.map((flavor) => (
              <span key={flavor} className="flavor-tag-large">
                {flavor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
