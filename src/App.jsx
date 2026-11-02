import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { Navbar } from './components/Navbar';
import { SummaryCards } from './components/SummaryCards';
import { ChartsSection } from './components/ChartsSection';
import { BudgetSection } from './components/BudgetSection';
import { TransactionList } from './components/TransactionList';
import { TransactionModal } from './components/TransactionModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Toast } from './components/Toast';
import { useFinance } from './context/FinanceContext';
import { Heart, Github, Sparkles } from 'lucide-react';

const DashboardContent = () => {
  const { deleteTransaction } = useFinance();

  // Modal states
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const handleOpenAddModal = () => {
    setTransactionToEdit(null);
    setIsTxModalOpen(true);
  };

  const handleEditTransaction = (tx) => {
    setTransactionToEdit(tx);
    setIsTxModalOpen(true);
  };

  const handleDeletePrompt = (tx) => {
    setTransactionToDelete(tx);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onOpenAddModal={handleOpenAddModal} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Metric Summary Cards */}
        <SummaryCards />

        {/* Charts & Visualizations */}
        <ChartsSection />

        {/* Budget Goals Section */}
        <BudgetSection />

        {/* Transactions Table & Controls */}
        <TransactionList
          onOpenAddModal={handleOpenAddModal}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeletePrompt}
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span>FinTrack — Personal Finance & Expense Tracker</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-400">LocalStorage Encrypted • 100% Client-Side Privacy</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TransactionModal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        transactionToEdit={transactionToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        transaction={transactionToDelete}
        onConfirm={deleteTransaction}
      />

      {/* Toast Notification */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <DashboardContent />
    </FinanceProvider>
  );
}
