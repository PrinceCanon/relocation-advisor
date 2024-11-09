import React, { useState, useEffect } from 'react';
import { Question as QuestionType } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string | number) => void;
  onBack: () => void;
  showBack: boolean;
  currentAnswer?: string | number;
}

export const Question: React.FC<QuestionProps> = ({ 
  question, 
  onAnswer, 
  onBack, 
  showBack,
  currentAnswer 
}) => {
  const [rangeValue, setRangeValue] = useState(currentAnswer as number || question.min || 1000);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (currentAnswer !== undefined) {
      setRangeValue(currentAnswer as number);
      setIsConfirming(true);
    } else if (question.min !== undefined) {
      setRangeValue(question.min);
      setIsConfirming(false);
    }
  }, [currentAnswer, question.min]);

  if (question.type === 'range') {
    return (
      <div className="w-full max-w-lg mx-auto">
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        )}
        <label className="block text-xl font-medium mb-6 text-gray-900">
          {question.text}
        </label>
        <div className="relative mb-8">
          <input
            type="range"
            min={question.min}
            max={question.max}
            value={rangeValue}
            step={question.step || 100}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((rangeValue - (question.min || 0)) / ((question.max || 10000) - (question.min || 0))) * 100}%, #e5e7eb ${((rangeValue - (question.min || 0)) / ((question.max || 10000) - (question.min || 0))) * 100}%, #e5e7eb 100%)`
            }}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setRangeValue(value);
              setIsConfirming(true);
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{question.prefix || '$'}{question.min?.toLocaleString()}</span>
            <span>{question.prefix || '$'}{question.max?.toLocaleString()}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-blue-600 mb-4">
            {question.prefix || '$'}{rangeValue.toLocaleString()}
          </div>
          {isConfirming && (
            <button
              onClick={() => onAnswer(rangeValue)}
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg
                       hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              <Check className="w-5 h-5 mr-2" />
              Confirm Selection
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      )}
      <label className="block text-xl font-medium mb-6 text-gray-900">
        {question.text}
      </label>
      <div className="space-y-3">
        {question.options?.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className={`w-full p-4 text-left border rounded-lg transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     ${option === currentAnswer 
                       ? 'border-blue-500 bg-blue-50' 
                       : 'hover:border-blue-500 hover:bg-blue-50'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};