import React from 'react';
import { Country } from '../types';
import { ArrowRight, Star } from 'lucide-react';

interface ResultsProps {
  countries: Country[];
  onUpgrade: () => void;
}

export const Results: React.FC<ResultsProps> = ({ countries, onUpgrade }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Your Top Matches</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {countries.slice(0, 2).map((country) => (
          <div key={country.name} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={country.imageUrl} 
              alt={country.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{country.name}</h3>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">
                    {country.matchScore}% Match
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{country.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Unlock Full Access</h3>
        <p className="mb-6">Get detailed insights about cost of living, visa requirements, and more for all matching countries.</p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <h4 className="font-semibold mb-2">Basic</h4>
            <p className="text-sm">Preview of top matches</p>
            <p className="mt-2 font-bold">Free</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 transform scale-105">
            <h4 className="font-semibold mb-2">Standard</h4>
            <p className="text-sm">Email summary with details</p>
            <p className="mt-2 font-bold">$29</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <h4 className="font-semibold mb-2">Premium</h4>
            <p className="text-sm">Complete relocation guide</p>
            <p className="mt-2 font-bold">$99</p>
          </div>
        </div>

        <button
          onClick={onUpgrade}
          className="w-full md:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold
                   hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
        >
          Upgrade Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};