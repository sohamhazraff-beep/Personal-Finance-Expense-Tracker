// Generates realistic dates relative to today
const getRelativeDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const INITIAL_TRANSACTIONS = [
  // Current month transactions
  {
    id: 'tx-1',
    title: 'Monthly Tech Salary',
    amount: 5200.00,
    type: 'income',
    category: 'salary',
    date: getRelativeDate(1),
    paymentMethod: 'bank',
    note: 'Primary salary direct deposit'
  },
  {
    id: 'tx-2',
    title: 'Apartment Rent & Utilities',
    amount: 1450.00,
    type: 'expense',
    category: 'housing',
    date: getRelativeDate(2),
    paymentMethod: 'bank',
    note: 'Monthly 2-bedroom rent + water & heat'
  },
  {
    id: 'tx-3',
    title: 'Whole Foods Grocery Run',
    amount: 142.50,
    type: 'expense',
    category: 'food',
    date: getRelativeDate(2),
    paymentMethod: 'card',
    note: 'Organic vegetables, fruits & pantry essentials'
  },
  {
    id: 'tx-4',
    title: 'Full-Stack Web Dev Bootcamp',
    amount: 320.00,
    type: 'expense',
    category: 'education',
    date: getRelativeDate(3),
    paymentMethod: 'card',
    note: 'React & System Design advanced course subscription'
  },
  {
    id: 'tx-5',
    title: 'Freelance UI/UX Consulting',
    amount: 850.00,
    type: 'income',
    category: 'freelance',
    date: getRelativeDate(4),
    paymentMethod: 'upi',
    note: 'Fintech client dashboard wireframes'
  },
  {
    id: 'tx-6',
    title: 'Weekend Flight Tickets',
    amount: 285.00,
    type: 'expense',
    category: 'travel',
    date: getRelativeDate(5),
    paymentMethod: 'card',
    note: 'Roundtrip flight tickets for conference'
  },
  {
    id: 'tx-7',
    title: 'Winter Jacket & Sneakers',
    amount: 189.99,
    type: 'expense',
    category: 'shopping',
    date: getRelativeDate(6),
    paymentMethod: 'card',
    note: 'Seasonal clothing sale'
  },
  {
    id: 'tx-8',
    title: 'Italian Trattoria Dinner',
    amount: 78.40,
    type: 'expense',
    category: 'food',
    date: getRelativeDate(7),
    paymentMethod: 'card',
    note: 'Dinner with friends'
  },
  {
    id: 'tx-9',
    title: 'Uber & Metro Transit Pass',
    amount: 65.00,
    type: 'expense',
    category: 'travel',
    date: getRelativeDate(8),
    paymentMethod: 'card',
    note: 'Monthly subway card recharge'
  },
  {
    id: 'tx-10',
    title: 'Textbooks & Kindle Technical Books',
    amount: 94.00,
    type: 'expense',
    category: 'education',
    date: getRelativeDate(9),
    paymentMethod: 'card',
    note: 'Clean Architecture and Financial Planning'
  },
  {
    id: 'tx-11',
    title: 'Stock Dividend Yield',
    amount: 215.30,
    type: 'income',
    category: 'investments',
    date: getRelativeDate(11),
    paymentMethod: 'bank',
    note: 'Quarterly index fund dividend'
  },
  {
    id: 'tx-12',
    title: 'Electronics & Noise-Cancelling Headphones',
    amount: 249.00,
    type: 'expense',
    category: 'shopping',
    date: getRelativeDate(12),
    paymentMethod: 'card',
    note: 'Work-from-home audio setup'
  },
  {
    id: 'tx-13',
    title: 'Coffee Roasters & Bakery',
    amount: 32.50,
    type: 'expense',
    category: 'food',
    date: getRelativeDate(13),
    paymentMethod: 'cash',
    note: 'Weekly artisan coffee beans'
  },
  {
    id: 'tx-14',
    title: 'Gym & Fitness Membership',
    amount: 60.00,
    type: 'expense',
    category: 'health',
    date: getRelativeDate(14),
    paymentMethod: 'card',
    note: 'Monthly fitness center dues'
  },
  {
    id: 'tx-15',
    title: 'Streaming Services & Cinema',
    amount: 45.00,
    type: 'expense',
    category: 'entertainment',
    date: getRelativeDate(15),
    paymentMethod: 'card',
    note: 'Netflix & IMAX weekend tickets'
  },

  // Past 30-60 days (previous month transactions to show rich monthly charts)
  {
    id: 'tx-16',
    title: 'Previous Month Tech Salary',
    amount: 5200.00,
    type: 'income',
    category: 'salary',
    date: getRelativeDate(32),
    paymentMethod: 'bank',
    note: 'Salary direct deposit'
  },
  {
    id: 'tx-17',
    title: 'Prior Month Rent',
    amount: 1450.00,
    type: 'expense',
    category: 'housing',
    date: getRelativeDate(33),
    paymentMethod: 'bank',
    note: 'Apartment lease payment'
  },
  {
    id: 'tx-18',
    title: 'Groceries & Farmers Market',
    amount: 380.00,
    type: 'expense',
    category: 'food',
    date: getRelativeDate(35),
    paymentMethod: 'card',
    note: 'Monthly groceries'
  },
  {
    id: 'tx-19',
    title: 'Online Cloud Certification Exam',
    amount: 250.00,
    type: 'expense',
    category: 'education',
    date: getRelativeDate(38),
    paymentMethod: 'card',
    note: 'AWS Solutions Architect Exam Fee'
  },
  {
    id: 'tx-20',
    title: 'High-Speed Railway Ticket',
    amount: 140.00,
    type: 'expense',
    category: 'travel',
    date: getRelativeDate(42),
    paymentMethod: 'card',
    note: 'Express train tickets'
  },
  {
    id: 'tx-21',
    title: 'Ergonomic Desk Chair',
    amount: 320.00,
    type: 'expense',
    category: 'shopping',
    date: getRelativeDate(45),
    paymentMethod: 'card',
    note: 'Home office ergonomic mesh chair'
  },
  {
    id: 'tx-22',
    title: 'Freelance Web App Build',
    amount: 1200.00,
    type: 'income',
    category: 'freelance',
    date: getRelativeDate(48),
    paymentMethod: 'bank',
    note: 'Milestone 2 payment for e-commerce website'
  },
  // 60-90 days ago
  {
    id: 'tx-23',
    title: 'Quarterly Tech Salary',
    amount: 5200.00,
    type: 'income',
    category: 'salary',
    date: getRelativeDate(62),
    paymentMethod: 'bank',
    note: 'Salary deposit'
  },
  {
    id: 'tx-24',
    title: 'Quarterly Rent',
    amount: 1450.00,
    type: 'expense',
    category: 'housing',
    date: getRelativeDate(63),
    paymentMethod: 'bank',
    note: 'Monthly lease'
  },
  {
    id: 'tx-25',
    title: 'University Tuition Module',
    amount: 600.00,
    type: 'expense',
    category: 'education',
    date: getRelativeDate(67),
    paymentMethod: 'bank',
    note: 'Semester module enrollment'
  },
  {
    id: 'tx-26',
    title: 'Dining & Restaurants',
    amount: 410.00,
    type: 'expense',
    category: 'food',
    date: getRelativeDate(70),
    paymentMethod: 'card',
    note: 'Various restaurants and groceries'
  },
  {
    id: 'tx-27',
    title: 'Summer Vacation Flight & Hotel',
    amount: 820.00,
    type: 'expense',
    category: 'travel',
    date: getRelativeDate(75),
    paymentMethod: 'card',
    note: 'Holiday trip'
  },
  {
    id: 'tx-28',
    title: 'Apparel & Gadgets',
    amount: 310.00,
    type: 'expense',
    category: 'shopping',
    date: getRelativeDate(78),
    paymentMethod: 'card',
    note: 'Seasonal sales'
  }
];

export const INITIAL_BUDGETS = {
  food: 500,
  shopping: 350,
  travel: 300,
  education: 400,
  housing: 1600,
  entertainment: 150,
  health: 120,
  other_expense: 200
};
