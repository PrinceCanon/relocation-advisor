import { UserResponse, Country } from '../types';

const countryDatabase: Country[] = [
  {
    name: "Portugal",
    description: "Beautiful coastal cities, rich culture, and excellent quality of life with a growing tech scene.",
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80",
    matchScore: 0,
    details: {
      costOfLiving: "Moderate",
      climate: "Mediterranean",
      languages: ["Portuguese", "English"],
      jobMarket: "Growing tech hub",
      budgetRange: [1500, 4000],
      lifestyles: ["Urban/City life", "Beach/Coastal"],
      healthcare: "High quality public and private options",
      internetSpeed: 100,
      visaOptions: ["D7 Passive Income", "Digital Nomad", "Golden Visa"],
      safety: 85,
      expatCommunity: "Large and growing",
      publicTransport: "Excellent in major cities",
      education: "High quality universities",
      taxRate: 20
    }
  },
  {
    name: "Spain",
    description: "Vibrant lifestyle, world-class cuisine, and diverse landscapes from beaches to mountains.",
    imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80",
    matchScore: 0,
    details: {
      costOfLiving: "Moderate",
      climate: "Mediterranean",
      languages: ["Spanish", "English"],
      jobMarket: "Diverse opportunities",
      budgetRange: [2000, 4500],
      lifestyles: ["Urban/City life", "Beach/Coastal", "Rural/Countryside"],
      healthcare: "World-class public healthcare",
      internetSpeed: 300,
      visaOptions: ["Digital Nomad", "Non-Lucrative Visa", "Golden Visa"],
      safety: 82,
      expatCommunity: "Very large and diverse",
      publicTransport: "Extensive network",
      education: "Excellent international schools",
      taxRate: 24
    }
  },
  {
    name: "Thailand",
    description: "Tropical paradise with rich culture, amazing food, and low cost of living.",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80",
    matchScore: 0,
    details: {
      costOfLiving: "Low",
      climate: "Tropical",
      languages: ["Thai", "English"],
      jobMarket: "Digital nomad friendly",
      budgetRange: [1000, 3000],
      lifestyles: ["Urban/City life", "Beach/Coastal", "Rural/Countryside"],
      healthcare: "High quality private hospitals",
      internetSpeed: 200,
      visaOptions: ["Elite Visa", "Digital Nomad", "Retirement Visa"],
      safety: 75,
      expatCommunity: "Large in tourist areas",
      publicTransport: "Good in Bangkok",
      education: "Growing international options",
      taxRate: 15
    }
  },
  {
    name: "Germany",
    description: "High standard of living, excellent infrastructure, and strong economy.",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80",
    matchScore: 0,
    details: {
      costOfLiving: "High",
      climate: "Temperate",
      languages: ["German", "English"],
      jobMarket: "Strong tech and industrial",
      budgetRange: [2500, 5000],
      lifestyles: ["Urban/City life", "Suburban"],
      healthcare: "Top-tier universal healthcare",
      internetSpeed: 250,
      visaOptions: ["EU Blue Card", "Freelance Visa", "Job Seeker Visa"],
      safety: 88,
      expatCommunity: "Large in major cities",
      publicTransport: "Excellent nationwide",
      education: "World-renowned universities",
      taxRate: 42
    }
  },
  {
    name: "Canada",
    description: "Safe, multicultural society with stunning nature and high quality of life.",
    imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80",
    matchScore: 0,
    details: {
      costOfLiving: "High",
      climate: "Cold",
      languages: ["English", "French"],
      jobMarket: "Diverse and stable",
      budgetRange: [3000, 6000],
      lifestyles: ["Urban/City life", "Suburban", "Rural/Countryside"],
      healthcare: "Universal healthcare system",
      internetSpeed: 175,
      visaOptions: ["Express Entry", "Start-up Visa", "Self-employed"],
      safety: 90,
      expatCommunity: "Very diverse and welcoming",
      publicTransport: "Good in major cities",
      education: "High quality education system",
      taxRate: 33
    }
  }
];

export function getRecommendations(responses: UserResponse[]): Country[] {
  const budget = responses.find(r => r.questionId === 1)?.answer as number;
  const savings = responses.find(r => r.questionId === 2)?.answer as number;
  const climate = responses.find(r => r.questionId === 3)?.answer as string;
  const language = responses.find(r => r.questionId === 4)?.answer as string;
  const workSituation = responses.find(r => r.questionId === 5)?.answer as string;
  const lifestyle = responses.find(r => r.questionId === 6)?.answer as string;
  const healthcare = responses.find(r => r.questionId === 7)?.answer as string;
  const internetSpeed = responses.find(r => r.questionId === 8)?.answer as number;
  const visa = responses.find(r => r.questionId === 9)?.answer as string;
  const expat = responses.find(r => r.questionId === 10)?.answer as string;

  const scoredCountries = countryDatabase.map(country => {
    let score = 0;
    const details = country.details;

    // Budget match (20 points)
    if (budget >= details.budgetRange[0] && budget <= details.budgetRange[1]) {
      score += 20;
    } else if (budget >= details.budgetRange[0] * 0.8 && budget <= details.budgetRange[1] * 1.2) {
      score += 10;
    }

    // Climate match (15 points)
    if (details.climate === climate) {
      score += 15;
    }

    // Language match (10 points)
    if (language === 'Already multilingual' || 
        (language === 'English only' && details.languages.includes('English')) ||
        language === 'Willing to learn new language') {
      score += 10;
    }

    // Work situation match (10 points)
    if ((workSituation === 'Remote worker' && details.internetSpeed >= 100) ||
        (workSituation === 'Looking for local job' && details.jobMarket.includes('tech')) ||
        (workSituation === 'Digital nomad' && details.visaOptions.includes('Digital Nomad')) ||
        workSituation === 'Retired') {
      score += 10;
    }

    // Lifestyle match (10 points)
    if (details.lifestyles.includes(lifestyle)) {
      score += 10;
    }

    // Healthcare match (10 points)
    if (healthcare === 'Essential - Need top-tier healthcare' && 
        (details.healthcare.includes('top-tier') || details.healthcare.includes('world-class'))) {
      score += 10;
    } else if (healthcare === 'Important but not critical' && 
               (details.healthcare.includes('High quality') || details.healthcare.includes('Universal'))) {
      score += 8;
    } else if (healthcare === 'Not a primary concern') {
      score += 5;
    }

    // Internet speed match (5 points)
    if (details.internetSpeed >= internetSpeed) {
      score += 5;
    }

    // Visa match (10 points)
    if ((visa === 'Need digital nomad visa' && details.visaOptions.includes('Digital Nomad')) ||
        (visa === 'Looking for permanent residency' && details.visaOptions.some(v => v.includes('Entry') || v.includes('Golden'))) ||
        (visa === 'Retirement visa' && details.visaOptions.some(v => v.includes('Retirement'))) ||
        (visa === 'EU passport holder' && country.name === 'Portugal' || country.name === 'Spain' || country.name === 'Germany')) {
      score += 10;
    }

    // Expat community match (10 points)
    if (expat === 'Very important - Need strong expat presence' && 
        (details.expatCommunity.includes('Large') || details.expatCommunity.includes('Very'))) {
      score += 10;
    } else if (expat === 'Somewhat important' && details.expatCommunity.includes('growing')) {
      score += 7;
    } else if (expat === 'Prefer local integration') {
      score += 5;
    }

    return {
      ...country,
      matchScore: score
    };
  });

  return scoredCountries
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}