import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { formatCurrency } from '../constants/currencies';
import { useFinance } from '../context/FinanceContext';

export const DeleteConfirmModal = ({ isOpen, onClose, transaction, onConfirm }) => {
  const { currency } = useFinance();

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/40 flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete Transaction
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove this record?
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-5">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {transaction.title}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
            <span>{transaction.date}</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">
              {formatCurrency(transaction.amount, currency)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(transaction.id);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md shadow-rose-600/20 active:scale-[0.98] transition-all"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};
