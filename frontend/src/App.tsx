import { useState } from 'react';
import { BeerList } from './components/BeerList';
import { BeerDetail } from './components/BeerDetail';
import './App.css';

function App() {
  const [selectedBeerId, setSelectedBeerId] = useState<number | null>(null);

  const handleBeerSelect = (id: number) => {
    setSelectedBeerId(id);
  };

  const handleBackToList = () => {
    setSelectedBeerId(null);
  };

  return (
    <div className="app">
      {selectedBeerId === null ? (
        <BeerList onBeerSelect={handleBeerSelect} />
      ) : (
        <BeerDetail beerId={selectedBeerId} onBack={handleBackToList} />
      )}
    </div>
  );
}

export default App;
