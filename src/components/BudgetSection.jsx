import React, { useState } from 'react';
import { Target, Edit2, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../constants/currencies';
import { CategoryIcon } from './CategoryIcon';

export const BudgetSection = () => {
  const { budgetProgress, updateBudget, currency } = useFinance();
  const [editingCategory, setEditingCategory] = useState(null);
  const [tempBudgetAmount, setTempBudgetAmount] = useState('');

  const startEdit = (catId, currentVal) => {
    setEditingCategory(catId);
    setTempBudgetAmount(currentVal.toString());
  };

  const saveEdit = (catId) => {
    updateBudget(catId, tempBudgetAmount);
    setEditingCategory(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Category Budgets & Goals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor target spending limits for Food, Shopping, Travel, Education and more
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-100 dark:border-indigo-800/40 hidden sm:inline-block">
          Interactive Targets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {budgetProgress.slice(0, 8).map(({ category, budgetLimit, spent, remaining, percent, status }) => {
          const isEditing = editingCategory === category.id;

          const progressColor =
            status === 'danger'
              ? 'bg-rose-500'
              : status === 'warning'
              ? 'bg-amber-500'
              : 'bg-emerald-500';

          return (
            <div
              key={category.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                      <CategoryIcon iconName={category.icon} className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {category.shortName}
                    </span>
                  </div>

                  {/* Edit Budget Button */}
                  {isEditing ? (
                    <button
                      onClick={() => saveEdit(category.id)}
                      className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      title="Save limit"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(category.id, budgetLimit)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Edit target"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Spent vs Budget amount */}
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {formatCurrency(spent, currency)}
                  </span>

                  {isEditing ? (
                    <div className="flex items-center gap-1 w-24">
                      <span className="text-xs text-slate-400">/</span>
                      <input
                        type="number"
                        value={tempBudgetAmount}
                        onChange={(e) => setTempBudgetAmount(e.target.value)}
                        className="w-full text-xs font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(category.id);
                          if (e.key === 'Escape') setEditingCategory(null);
                        }}
                      />
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 tabular-nums">
                      / {formatCurrency(budgetLimit, currency)}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between text-[11px] font-medium mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800">
                <span className={status === 'danger' ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                  {percent}% used
                </span>
                <span className="text-slate-400">
                  {status === 'danger' ? 'Over budget!' : `${formatCurrency(remaining, currency)} left`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
