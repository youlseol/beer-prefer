import { useState } from 'react';
import { Beer } from '@shared/types/models';
import { BeerList } from './components/BeerList';
import { BeerDetail } from './components/BeerDetail';
import { RecommendationQuiz } from './components/RecommendationQuiz';
import { beerService } from './services/beerService';
import './App.css';

type AppState = 'quiz' | 'loading' | 'results' | 'detail' | 'error';

function App() {
  const [appState, setAppState] = useState<AppState>('quiz');
  const [recommendedBeers, setRecommendedBeers] = useState<Beer[]>([]);
  const [selectedBeerId, setSelectedBeerId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuizSubmit = async (preferences: any) => {
    try {
      setAppState('loading');
      setError(null);
      const beers = await beerService.getRecommendations(preferences);
      setRecommendedBeers(beers);
      setAppState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setAppState('error');
    }
  };

  const handleBeerSelect = (id: number) => {
    setSelectedBeerId(id);
    setAppState('detail');
  };

  const handleBackToList = () => {
    setSelectedBeerId(null);
    setAppState('results');
  };

  const handleReset = () => {
    setAppState('quiz');
    setRecommendedBeers([]);
    setSelectedBeerId(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'quiz':
        return <RecommendationQuiz onSubmit={handleQuizSubmit} />;
      case 'loading':
        return <div className="loading">Finding your beers...</div>;
      case 'results':
        return (
          <BeerList
            beers={recommendedBeers}
            onBeerSelect={handleBeerSelect}
            onReset={handleReset}
          />
        );
      case 'detail':
        return <BeerDetail beerId={selectedBeerId!} onBack={handleBackToList} />;
      case 'error':
        return (
          <div className="error">
            <p>{error}</p>
            <button onClick={handleReset} className="retry-button">Try Again</button>
          </div>
        );
      default:
        return <RecommendationQuiz onSubmit={handleQuizSubmit} />;
    }
  };

  return <div className="app">{renderContent()}</div>;
}

export default App;
