import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, INITIAL_BUDGETS } from '../data/initialData';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories';

const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('fin_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('fin_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Currency
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('fin_currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('fin_currency', currency);
  }, [currency]);

  // Transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('fin_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved transactions', e);
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('fin_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Budgets
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('fin_budgets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved budgets', e);
      }
    }
    return INITIAL_BUDGETS;
  });

  useEffect(() => {
    localStorage.setItem('fin_budgets', JSON.stringify(budgets));
  }, [budgets]);

  // Filter & Search states
  const [selectedPeriod, setSelectedPeriod] = useState('all'); // 'all', 'this-month', 'last-month', or 'YYYY-MM'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'income', 'expense'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'amount-desc', 'amount-asc'

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Transaction Actions
  const addTransaction = (data) => {
    const newTx = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title.trim(),
      amount: parseFloat(data.amount) || 0,
      type: data.type,
      category: data.category,
      date: data.date || new Date().toISOString().split('T')[0],
      paymentMethod: data.paymentMethod || 'card',
      note: data.note ? data.note.trim() : ''
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast(`Added "${newTx.title}" successfully!`);
  };

  const editTransaction = (updatedTx) => {
    setTransactions(prev =>
      prev.map(tx => (tx.id === updatedTx.id ? { ...updatedTx, amount: parseFloat(updatedTx.amount) || 0 } : tx))
    );
    showToast(`Transaction updated successfully!`);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    showToast(`Transaction deleted`, 'info');
  };

  const updateBudget = (categoryId, amount) => {
    setBudgets(prev => ({
      ...prev,
      [categoryId]: Math.max(0, parseFloat(amount) || 0)
    }));
    showToast(`Budget updated!`);
  };

  const resetToDemo = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(INITIAL_BUDGETS);
    showToast(`Reset to demo dataset`, 'info');
  };

  const clearAll = () => {
    setTransactions([]);
    showToast(`Cleared all transactions`, 'info');
  };

  // Export to CSV
  const exportToCSV = () => {
    if (transactions.length === 0) {
      showToast('No transactions to export', 'error');
      return;
    }

    const headers = ['ID', 'Date', 'Title', 'Type', 'Category', 'Amount', 'Currency', 'Payment Method', 'Note'];
    const rows = transactions.map(t => [
      `"${t.id}"`,
      `"${t.date}"`,
      `"${(t.title || '').replace(/"/g, '""')}"`,
      `"${t.type}"`,
      `"${t.category}"`,
      t.amount,
      `"${currency}"`,
      `"${t.paymentMethod || ''}"`,
      `"${(t.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `finance-tracker-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV successfully!');
  };

  // Import from CSV
  const importFromCSV = (csvText) => {
    try {
      const lines = csvText.trim().split(/\r\n|\n/);
      if (lines.length < 2) {
        showToast('Invalid CSV format: file is empty', 'error');
        return;
      }

      // Check header or parse lines
      const imported = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple regex-based CSV splitter
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
        const cleanFields = matches.map(m => m.replace(/^"|"$/g, '').trim());

        if (cleanFields.length >= 6) {
          const date = cleanFields[1] || new Date().toISOString().split('T')[0];
          const title = cleanFields[2] || 'Imported Transaction';
          const type = cleanFields[3]?.toLowerCase() === 'income' ? 'income' : 'expense';
          const category = cleanFields[4] || (type === 'income' ? 'salary' : 'food');
          const amount = parseFloat(cleanFields[5]) || 0;
          const paymentMethod = cleanFields[7] || 'card';
          const note = cleanFields[8] || '';

          imported.push({
            id: `imported-${Date.now()}-${i}`,
            title,
            amount: Math.abs(amount),
            type,
            category,
            date,
            paymentMethod,
            note
          });
        }
      }

      if (imported.length > 0) {
        setTransactions(prev => [...imported, ...prev]);
        showToast(`Imported ${imported.length} transactions successfully!`);
      } else {
        showToast('No valid transactions parsed from CSV', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error parsing CSV file', 'error');
    }
  };

  // Helper date filters
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

  // Available unique month strings from transactions
  const availableMonths = useMemo(() => {
    const set = new Set();
    transactions.forEach(t => {
      if (t.date && t.date.length >= 7) {
        set.add(t.date.substring(0, 7));
      }
    });
    return Array.from(set).sort().reverse();
  }, [transactions]);

  // Filtered transactions for calculation & list view
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Period filter
      if (selectedPeriod === 'this-month') {
        if (!t.date || !t.date.startsWith(currentMonthStr)) return false;
      } else if (selectedPeriod === 'last-month') {
        if (!t.date || !t.date.startsWith(lastMonthStr)) return false;
      } else if (selectedPeriod !== 'all') {
        if (!t.date || !t.date.startsWith(selectedPeriod)) return false;
      }

      // Type filter
      if (selectedType !== 'all' && t.type !== selectedType) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = t.title?.toLowerCase().includes(query);
        const matchesNote = t.note?.toLowerCase().includes(query);
        const matchesCategory = t.category?.toLowerCase().includes(query);
        const matchesAmount = t.amount?.toString().includes(query);
        if (!matchesTitle && !matchesNote && !matchesCategory && !matchesAmount) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'amount-desc') {
        return b.amount - a.amount;
      }
      if (sortBy === 'amount-asc') {
        return a.amount - b.amount;
      }
      return 0;
    });
  }, [transactions, selectedPeriod, selectedType, selectedCategory, searchQuery, sortBy, currentMonthStr, lastMonthStr]);

  // Calculations for current period (or overall)
  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    // Use transactions scoped to selected period (ignoring text search and category filter for high-level cards)
    const periodScoped = transactions.filter(t => {
      if (selectedPeriod === 'this-month') {
        return t.date && t.date.startsWith(currentMonthStr);
      } else if (selectedPeriod === 'last-month') {
        return t.date && t.date.startsWith(lastMonthStr);
      } else if (selectedPeriod !== 'all') {
        return t.date && t.date.startsWith(selectedPeriod);
      }
      return true;
    });

    periodScoped.forEach(t => {
      if (t.type === 'income') {
        income += Number(t.amount) || 0;
      } else if (t.type === 'expense') {
        expense += Number(t.amount) || 0;
      }
    });

    const savings = income - expense;
    const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
    const expenseRate = income > 0 ? Math.round((expense / income) * 100) : 0;

    return {
      totalIncome: income,
      totalExpenses: expense,
      netSavings: savings,
      savingsRate,
      expenseRate,
      transactionCount: periodScoped.length
    };
  }, [transactions, selectedPeriod, currentMonthStr, lastMonthStr]);

  // Monthly breakdown for charts
  const monthlyChartData = useMemo(() => {
    const map = {};

    transactions.forEach(t => {
      if (!t.date) return;
      const monthKey = t.date.substring(0, 7); // 'YYYY-MM'
      if (!map[monthKey]) {
        const [year, month] = monthKey.split('-');
        const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
        const monthLabel = dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

        map[monthKey] = {
          monthKey,
          name: monthLabel,
          income: 0,
          expense: 0,
          savings: 0
        };
      }

      if (t.type === 'income') {
        map[monthKey].income += Number(t.amount) || 0;
      } else if (t.type === 'expense') {
        map[monthKey].expense += Number(t.amount) || 0;
      }
    });

    const sortedKeys = Object.keys(map).sort();
    return sortedKeys.map(k => {
      const item = map[k];
      return {
        ...item,
        savings: item.income - item.expense,
        income: Math.round(item.income * 100) / 100,
        expense: Math.round(item.expense * 100) / 100
      };
    });
  }, [transactions]);

  // Category breakdown for expenses
  const categorySpendingData = useMemo(() => {
    const map = {};
    let totalExpense = 0;

    // Scope to current selected period
    const periodScoped = transactions.filter(t => {
      if (t.type !== 'expense') return false;
      if (selectedPeriod === 'this-month') {
        return t.date && t.date.startsWith(currentMonthStr);
      } else if (selectedPeriod === 'last-month') {
        return t.date && t.date.startsWith(lastMonthStr);
      } else if (selectedPeriod !== 'all') {
        return t.date && t.date.startsWith(selectedPeriod);
      }
      return true;
    });

    periodScoped.forEach(t => {
      const cat = EXPENSE_CATEGORIES.find(c => c.id === t.category) || {
        id: t.category,
        name: t.category || 'Other',
        shortName: t.category || 'Other',
        color: '#94a3b8'
      };

      const amt = Number(t.amount) || 0;
      totalExpense += amt;

      if (!map[cat.id]) {
        map[cat.id] = {
          id: cat.id,
          name: cat.name,
          shortName: cat.shortName,
          value: 0,
          color: cat.color,
          count: 0
        };
      }
      map[cat.id].value += amt;
      map[cat.id].count += 1;
    });

    const list = Object.values(map)
      .map(item => ({
        ...item,
        value: Math.round(item.value * 100) / 100,
        percentage: totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0
      }))
      .sort((a, b) => b.value - a.value);

    return { list, totalExpense };
  }, [transactions, selectedPeriod, currentMonthStr, lastMonthStr]);

  // Daily Spending Trend for Area Chart
  const dailySpendingData = useMemo(() => {
    const map = {};
    const periodScoped = transactions.filter(t => {
      if (selectedPeriod === 'this-month') {
        return t.date && t.date.startsWith(currentMonthStr);
      } else if (selectedPeriod === 'last-month') {
        return t.date && t.date.startsWith(lastMonthStr);
      } else if (selectedPeriod !== 'all') {
        return t.date && t.date.startsWith(selectedPeriod);
      }
      return true;
    });

    periodScoped.forEach(t => {
      if (!t.date) return;
      if (!map[t.date]) {
        map[t.date] = { date: t.date, income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        map[t.date].income += Number(t.amount) || 0;
      } else if (t.type === 'expense') {
        map[t.date].expense += Number(t.amount) || 0;
      }
    });

    return Object.keys(map)
      .sort()
      .map(d => ({
        date: d,
        displayDate: d.substring(5), // 'MM-DD'
        income: Math.round(map[d].income * 100) / 100,
        expense: Math.round(map[d].expense * 100) / 100
      }));
  }, [transactions, selectedPeriod, currentMonthStr, lastMonthStr]);

  // Category Budget Progress
  const budgetProgress = useMemo(() => {
    return EXPENSE_CATEGORIES.map(category => {
      const budgetLimit = budgets[category.id] || 0;
      const spent = transactions
        .filter(t => {
          if (t.type !== 'expense' || t.category !== category.id) return false;
          if (selectedPeriod === 'this-month') {
            return t.date && t.date.startsWith(currentMonthStr);
          } else if (selectedPeriod === 'last-month') {
            return t.date && t.date.startsWith(lastMonthStr);
          } else if (selectedPeriod !== 'all') {
            return t.date && t.date.startsWith(selectedPeriod);
          }
          return true;
        })
        .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

      const percent = budgetLimit > 0 ? Math.round((spent / budgetLimit) * 100) : 0;
      let status = 'normal';
      if (percent >= 100) status = 'danger';
      else if (percent >= 80) status = 'warning';

      return {
        category,
        budgetLimit,
        spent: Math.round(spent * 100) / 100,
        remaining: Math.max(0, Math.round((budgetLimit - spent) * 100) / 100),
        percent,
        status
      };
    });
  }, [budgets, transactions, selectedPeriod, currentMonthStr, lastMonthStr]);

  const value = {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    transactions,
    filteredTransactions,
    budgets,
    updateBudget,
    selectedPeriod,
    setSelectedPeriod,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    availableMonths,
    toast,
    showToast,
    addTransaction,
    editTransaction,
    deleteTransaction,
    resetToDemo,
    clearAll,
    exportToCSV,
    importFromCSV,
    summary,
    monthlyChartData,
    categorySpendingData,
    dailySpendingData,
    budgetProgress
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
