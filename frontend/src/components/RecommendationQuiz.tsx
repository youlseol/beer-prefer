import React, { useState } from 'react';
import { BeerType, PackagingFormat } from '@shared/types/models';
import '../styles/RecommendationQuiz.css';

interface RecommendationQuizProps {
  onSubmit: (preferences: {
    types: BeerType[];
    formats: PackagingFormat[];
    flavors: string[];
    maxAbv: number;
  }) => void;
}

export function RecommendationQuiz({ onSubmit }: RecommendationQuizProps) {
  const [types, setTypes] = useState<BeerType[]>([]);
  const [formats, setFormats] = useState<PackagingFormat[]>([]);
  const [flavors, setFlavors] = useState<string[]>([]);
  const [maxAbv, setMaxAbv] = useState<number>(15);

  const beerTypes: BeerType[] = ['Lager', 'Ale', 'IPA', 'Stout', 'Pilsner', 'Wheat Beer', 'Porter', 'Sour'];
  const packagingFormats: PackagingFormat[] = ['Bottle', 'Can', 'Draft'];
  const flavorOptions: string[] = ['Hoppy', 'Malty', 'Fruity', 'Spicy', 'Sweet', 'Roasty', 'Sour', 'Bitter'];

  const handleCheckboxChange = <T,>(
    value: T,
    list: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ types, formats, flavors, maxAbv });
  };

  return (
    <div className="quiz-container">
      <h1>Find Your Perfect Beer</h1>
      <p>Answer a few questions to get a personalized beer recommendation.</p>
      <form onSubmit={handleSubmit} className="quiz-form">
        <fieldset>
          <legend>What type of beer do you prefer?</legend>
          <div className="checkbox-group">
            {beerTypes.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={types.includes(type)}
                  onChange={() => handleCheckboxChange(type, types, setTypes)}
                />
                {type}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>How do you like your beer packaged?</legend>
          <div className="checkbox-group">
            {packagingFormats.map((format) => (
              <label key={format}>
                <input
                  type="checkbox"
                  value={format}
                  checked={formats.includes(format)}
                  onChange={() => handleCheckboxChange(format, formats, setFormats)}
                />
                {format}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>What flavors do you enjoy?</legend>
          <div className="checkbox-group">
            {flavorOptions.map((flavor) => (
              <label key={flavor}>
                <input
                  type="checkbox"
                  value={flavor}
                  checked={flavors.includes(flavor)}
                  onChange={() => handleCheckboxChange(flavor, flavors, setFlavors)}
                />
                {flavor}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Maximum Alcohol Content (ABV %)</legend>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={maxAbv}
              onChange={(e) => setMaxAbv(Number(e.target.value))}
              className="abv-slider"
            />
            <span className="abv-value">{maxAbv.toFixed(1)}%</span>
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Get Recommendations</button>
      </form>
    </div>
  );
}
