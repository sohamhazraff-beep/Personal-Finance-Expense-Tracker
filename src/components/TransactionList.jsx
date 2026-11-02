import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Plus,
  RotateCcw,
  Tag,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Receipt
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../constants/currencies';
import { getCategoryById, ALL_CATEGORIES, EXPENSE_CATEGORIES } from '../constants/categories';
import { CategoryIcon } from './CategoryIcon';

export const TransactionList = ({ onEditTransaction, onDeleteTransaction, onOpenAddModal }) => {
  const {
    filteredTransactions,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    currency,
    resetToDemo
  } = useFinance();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-500" />
            Transaction History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage, filter, search, edit and delete your income and expense records
          </p>
        </div>

        {/* Quick Filter Buttons: All, Expense, Income */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 self-start md:self-auto">
          <button
            onClick={() => { setSelectedType('all'); setCurrentPage(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All ({filteredTransactions.length})
          </button>
          <button
            onClick={() => { setSelectedType('expense'); setCurrentPage(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === 'expense'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => { setSelectedType('income'); setCurrentPage(1); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === 'income'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-5 pb-4">
        {/* Search Input */}
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by title, note, or amount..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-4 relative">
          <Filter className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-7 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <optgroup label="Expense Categories">
              {EXPENSE_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </optgroup>
            <optgroup label="Income Categories">
              <option value="salary">Salary & Wage</option>
              <option value="freelance">Freelance & Projects</option>
              <option value="investments">Investments</option>
              <option value="gifts">Bonus & Gift</option>
              <option value="other_income">Other Income</option>
            </optgroup>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="sm:col-span-2 lg:col-span-3 relative">
          <ArrowUpDown className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-9 pr-7 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
          </select>
        </div>
      </div>

      {/* Transaction List Items */}
      {paginatedTransactions.length > 0 ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {paginatedTransactions.map((tx) => {
            const isIncome = tx.type === 'income';
            const categoryMeta = getCategoryById(tx.category, tx.type);

            return (
              <div
                key={tx.id}
                className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-2 rounded-xl transition-colors group"
              >
                {/* Category Icon and Title Info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${categoryMeta.color}20`, color: categoryMeta.color }}
                  >
                    <CategoryIcon iconName={categoryMeta.icon} className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                        {tx.title}
                      </p>
                      <span
                        className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md border flex-shrink-0"
                        style={{
                          backgroundColor: `${categoryMeta.color}15`,
                          borderColor: `${categoryMeta.color}35`,
                          color: categoryMeta.color
                        }}
                      >
                        {categoryMeta.shortName}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      <span>{formatDate(tx.date)}</span>
                      <span>•</span>
                      <span className="capitalize">{tx.paymentMethod || 'card'}</span>
                      {tx.note && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-xs italic text-slate-500 dark:text-slate-400">
                            {tx.note}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amount and Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 ml-14 sm:ml-0">
                  <div className="text-right">
                    <span
                      className={`text-base sm:text-lg font-bold tabular-nums ${
                        isIncome
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isIncome ? '+' : '-'}
                      {formatCurrency(tx.amount, currency)}
                    </span>
                  </div>

                  {/* Edit and Delete Actions */}
                  <div className="flex items-center gap-1 opacity-100 sm:opacity-70 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditTransaction(tx)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit transaction"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTransaction(tx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-12 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <Receipt className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No transactions found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
            {searchQuery || selectedCategory !== 'all' || selectedType !== 'all'
              ? 'Try resetting your search query or filters to see more results.'
              : 'Start logging your daily income and expenses or load realistic sample data.'}
          </p>

          <div className="flex items-center justify-center gap-3">
            {searchQuery || selectedCategory !== 'all' || selectedType !== 'all' ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Clear Filters
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenAddModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Transaction
                </button>
                <button
                  onClick={resetToDemo}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Load Sample Data
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-5 mt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{' '}
            {filteredTransactions.length} entries
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-semibold text-slate-700 dark:text-slate-300 px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
