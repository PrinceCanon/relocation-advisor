export interface Question {
  id: number;
  text: string;
  type: 'single' | 'range' | 'multiple';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
}

export interface UserResponse {
  questionId: number;
  answer: string | number | string[];
}

export interface Country {
  name: string;
  description: string;
  imageUrl: string;
  matchScore: number;
  details: {
    costOfLiving: string;
    climate: string;
    languages: string[];
    jobMarket: string;
    budgetRange: [number, number];
    lifestyles: string[];
    healthcare: string;
    internetSpeed: number;
    visaOptions: string[];
    safety: number;
    expatCommunity: string;
    publicTransport: string;
    education: string;
    taxRate: number;
  };
}