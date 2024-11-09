export const questions = [
  {
    id: 1,
    text: "What's your monthly budget for living expenses? (in USD)",
    type: 'range',
    min: 1000,
    max: 10000,
    step: 100,
    prefix: '$'
  },
  {
    id: 2,
    text: "What's your savings/investment capacity per month? (in USD)",
    type: 'range',
    min: 0,
    max: 5000,
    step: 100,
    prefix: '$'
  },
  {
    id: 3,
    text: "What climate do you prefer?",
    type: 'single',
    options: ['Tropical', 'Mediterranean', 'Temperate', 'Cold']
  },
  {
    id: 4,
    text: "Which language situation applies to you?",
    type: 'single',
    options: ['English only', 'Willing to learn new language', 'Already multilingual']
  },
  {
    id: 5,
    text: "What's your work situation?",
    type: 'single',
    options: ['Remote worker', 'Looking for local job', 'Starting a business', 'Retired', 'Digital nomad']
  },
  {
    id: 6,
    text: "What's your preferred lifestyle?",
    type: 'single',
    options: ['Urban/City life', 'Suburban', 'Beach/Coastal', 'Rural/Countryside']
  },
  {
    id: 7,
    text: "How important is healthcare quality?",
    type: 'single',
    options: ['Essential - Need top-tier healthcare', 'Important but not critical', 'Not a primary concern']
  },
  {
    id: 8,
    text: "Minimum internet speed required? (in Mbps)",
    type: 'range',
    min: 10,
    max: 1000,
    step: 10,
    prefix: ''
  },
  {
    id: 9,
    text: "What's your visa situation?",
    type: 'single',
    options: ['Need digital nomad visa', 'Looking for permanent residency', 'Retirement visa', 'EU passport holder']
  },
  {
    id: 10,
    text: "How important is the expat community?",
    type: 'single',
    options: ['Very important - Need strong expat presence', 'Somewhat important', 'Prefer local integration']
  }
];