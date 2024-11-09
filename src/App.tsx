import React, { useState } from 'react';
import { Question } from './components/Question';
import { ProgressBar } from './components/ProgressBar';
import { Results } from './components/Results';
import { questions } from './data/questions';
import { UserResponse, Country } from './types';
import { Globe } from 'lucide-react';
import { getRecommendations } from './utils/recommendationEngine';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Country[]>([]);
  
  const handleAnswer = (answer: string | number) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      answer
    };
    setResponses(newResponses);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const matchedCountries = getRecommendations(newResponses);
      setRecommendations(matchedCountries);
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getCurrentAnswer = () => {
    return responses[currentQuestion]?.answer;
  };

  const handleUpgrade = () => {
    console.log('Upgrade clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Globe className="w-8 h-8 text-blue-500" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              Relocation Advisor
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {!showResults ? (
          <div className="max-w-2xl mx-auto">
            <ProgressBar 
              current={currentQuestion + 1} 
              total={questions.length} 
            />
            <Question
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              onBack={handleBack}
              showBack={currentQuestion > 0}
              currentAnswer={getCurrentAnswer()}
            />
          </div>
        ) : (
          <Results 
            countries={recommendations}
            onUpgrade={handleUpgrade}
          />
        )}
      </main>
    </div>
  );
}

export default App;