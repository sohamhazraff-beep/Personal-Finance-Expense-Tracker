import React, { useRef } from 'react';
import {
  Wallet,
  Plus,
  Sun,
  Moon,
  Download,
  Upload,
  RotateCcw,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { CURRENCIES } from '../constants/currencies';

export const Navbar = ({ onOpenAddModal }) => {
  const {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    selectedPeriod,
    setSelectedPeriod,
    availableMonths,
    resetToDemo,
    exportToCSV,
    importFromCSV
  } = useFinance();

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          importFromCSV(text);
        }
      };
      reader.readAsText(file);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Fin<span className="text-emerald-500">Track</span>
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                  Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Smart Personal Finance & Expense Tracker
              </p>
            </div>
          </div>

          {/* Quick Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Period Filter Dropdown */}
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 absolute left-2.5 text-slate-400 pointer-events-none hidden md:block" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-800 border-none rounded-xl md:pl-8 pr-7 py-2 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors cursor-pointer"
                title="Filter by period"
              >
                <option value="all">All Time</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                {availableMonths.map((m) => {
                  const [yr, mo] = m.split('-');
                  const label = new Date(parseInt(yr, 10), parseInt(mo, 10) - 1, 1).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  });
                  return (
                    <option key={m} value={m}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Currency Selector */}
            <div className="relative flex items-center">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-2.5 py-2 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors cursor-pointer"
                title="Change display currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Export & Import buttons (Hidden on tiny screens) */}
            <div className="hidden lg:flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-3">
              <button
                onClick={exportToCSV}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Export transactions to CSV"
              >
                <Download className="w-4 h-4" />
              </button>

              <label
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Import transactions from CSV"
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv"
                  className="hidden"
                />
              </label>

              <button
                onClick={resetToDemo}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Reset to Demo Data"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Primary Add Transaction Button */}
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline sm:inline">Add Transaction</span>
              <span className="inline xs:hidden sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
