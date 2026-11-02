export const EXPENSE_CATEGORIES = [
  {
    id: 'food',
    name: 'Food & Dining',
    shortName: 'Food',
    color: '#f97316', // orange-500
    bgColor: 'bg-orange-100 dark:bg-orange-950/60',
    textColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: 'Utensils'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    shortName: 'Shopping',
    color: '#a855f7', // purple-500
    bgColor: 'bg-purple-100 dark:bg-purple-950/60',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
    icon: 'ShoppingBag'
  },
  {
    id: 'travel',
    name: 'Travel & Transport',
    shortName: 'Travel',
    color: '#0284c7', // sky-600
    bgColor: 'bg-sky-100 dark:bg-sky-950/60',
    textColor: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-200 dark:border-sky-800',
    icon: 'Plane'
  },
  {
    id: 'education',
    name: 'Education & Courses',
    shortName: 'Education',
    color: '#6366f1', // indigo-500
    bgColor: 'bg-indigo-100 dark:bg-indigo-950/60',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    icon: 'GraduationCap'
  },
  {
    id: 'housing',
    name: 'Housing & Rent',
    shortName: 'Housing',
    color: '#f43f5e', // rose-500
    bgColor: 'bg-rose-100 dark:bg-rose-950/60',
    textColor: 'text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-200 dark:border-rose-800',
    icon: 'Home'
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Leisure',
    shortName: 'Entertainment',
    color: '#ec4899', // pink-500
    bgColor: 'bg-pink-100 dark:bg-pink-950/60',
    textColor: 'text-pink-600 dark:text-pink-400',
    borderColor: 'border-pink-200 dark:border-pink-800',
    icon: 'Film'
  },
  {
    id: 'health',
    name: 'Health & Medical',
    shortName: 'Health',
    color: '#10b981', // emerald-500
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/60',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: 'HeartPulse'
  },
  {
    id: 'other_expense',
    name: 'Other Expense',
    shortName: 'Other',
    color: '#64748b', // slate-500
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    textColor: 'text-slate-600 dark:text-slate-300',
    borderColor: 'border-slate-200 dark:border-slate-700',
    icon: 'MoreHorizontal'
  }
];

export const INCOME_CATEGORIES = [
  {
    id: 'salary',
    name: 'Salary & Wage',
    shortName: 'Salary',
    color: '#10b981', // emerald-500
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/60',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: 'Briefcase'
  },
  {
    id: 'freelance',
    name: 'Freelance & Projects',
    shortName: 'Freelance',
    color: '#06b6d4', // cyan-500
    bgColor: 'bg-cyan-100 dark:bg-cyan-950/60',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    icon: 'Laptop'
  },
  {
    id: 'investments',
    name: 'Investments & Dividends',
    shortName: 'Investments',
    color: '#3b82f6', // blue-500
    bgColor: 'bg-blue-100 dark:bg-blue-950/60',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    icon: 'TrendingUp'
  },
  {
    id: 'gifts',
    name: 'Gifts & Bonus',
    shortName: 'Bonus/Gift',
    color: '#8b5cf6', // violet-500
    bgColor: 'bg-violet-100 dark:bg-violet-950/60',
    textColor: 'text-violet-600 dark:text-violet-400',
    borderColor: 'border-violet-200 dark:border-violet-800',
    icon: 'Gift'
  },
  {
    id: 'other_income',
    name: 'Other Income',
    shortName: 'Other',
    color: '#14b8a6', // teal-500
    bgColor: 'bg-teal-100 dark:bg-teal-950/60',
    textColor: 'text-teal-600 dark:text-teal-400',
    borderColor: 'border-teal-200 dark:border-teal-800',
    icon: 'PlusCircle'
  }
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const getCategoryById = (id, type = 'expense') => {
  const pool = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const match = pool.find(c => c.id === id);
  if (match) return match;
  return ALL_CATEGORIES.find(c => c.id === id) || {
    id: id || 'unknown',
    name: id || 'Uncategorized',
    shortName: id || 'Other',
    color: '#64748b',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    textColor: 'text-slate-600 dark:text-slate-300',
    borderColor: 'border-slate-200 dark:border-slate-700',
    icon: 'HelpCircle'
  };
};

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card' },
  { id: 'cash', name: 'Cash' },
  { id: 'bank', name: 'Bank Transfer' },
  { id: 'upi', name: 'UPI / Mobile Pay' },
  { id: 'other', name: 'Other' }
];
