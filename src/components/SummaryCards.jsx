import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../constants/currencies';

export const SummaryCards = () => {
  const { summary, currency, selectedPeriod } = useFinance();
  const { totalIncome, totalExpenses, netSavings, savingsRate, expenseRate } = summary;

  const isPositiveSavings = netSavings >= 0;

  // Period label for subtitle
  const periodLabel =
    selectedPeriod === 'all'
      ? 'All-Time Total'
      : selectedPeriod === 'this-month'
      ? 'Current Month'
      : selectedPeriod === 'last-month'
      ? 'Previous Month'
      : selectedPeriod;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* 1. Total Income Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
            Total Income
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(totalIncome, currency)}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" />
              Inflow
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {periodLabel}
            </span>
          </div>
        </div>

        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. Total Expenses Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
            Total Expenses
          </span>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-800/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <ArrowDownRight className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(totalExpenses, currency)}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md">
              <TrendingDown className="w-3.5 h-3.5" />
              {expenseRate}% of income
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {periodLabel}
            </span>
          </div>
        </div>

        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 3. Net Savings Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
            Net Savings
          </span>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isPositiveSavings
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-800/40 text-blue-600 dark:text-blue-400'
                : 'bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-800/40 text-amber-600 dark:text-amber-400'
            }`}
          >
            <PiggyBank className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4">
          <div
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums ${
              isPositiveSavings
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {isPositiveSavings ? '+' : '-'}
            {formatCurrency(netSavings, currency)}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                savingsRate >= 20
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : savingsRate >= 0
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
              }`}
            >
              {isPositiveSavings ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5" />
              )}
              {savingsRate}% Savings Rate
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {isPositiveSavings ? 'Surplus' : 'Deficit'}
            </span>
          </div>
        </div>

        <div
          className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none ${
            isPositiveSavings ? 'bg-blue-500/5' : 'bg-amber-500/5'
          }`}
        />
      </div>
    </div>
  );
};
