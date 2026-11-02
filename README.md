# 💰 FinTrack — Personal Finance & Expense Tracker

A modern, responsive, and intuitive **Personal Finance & Expense Tracker** web application built with **React**, **Tailwind CSS**, and **Recharts**. Track your daily income and expenses, monitor category budgets, visualize monthly cash flow with interactive charts, and take control of your financial freedom.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22c55e)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

### 1. ➕ Daily Income & Expense Management
- Seamlessly log both **income inflows** (Salary, Freelance, Investments, Gifts) and **expense outflows**.
- Enter amount, title/merchant, transaction date, payment method, and optional notes.
- Instant validation ensuring clean, accurate financial records.

### 2. 🏷️ Smart Category Spending
- Built-in categorization with color-coded tags and icons:
  - 🍔 **Food & Dining**
  - 🛍️ **Shopping**
  - ✈️ **Travel & Transport**
  - 🎓 **Education & Courses**
  - 🏠 **Housing & Rent**
  - 🎬 **Entertainment & Leisure**
  - 💊 **Health & Medical**
  - 💼 **Salary, Freelance & Investments**
- Real-time expense breakdown showing exact amounts and percentage share of spending.

### 3. 📊 Real-Time Financial Calculations
- **Total Income**: Live calculation of all inflows.
- **Total Expenses**: Outflow sum with percentage of income spent.
- **Net Savings**: Real-time savings balance (+ surplus / - deficit) with savings rate percentage badge.
- Period-level scoping: view **All-Time**, **This Month**, **Last Month**, or custom month selections.

### 4. 📈 Interactive Expense & Financial Charts
- **Monthly Income vs Expenses Comparison**: Dual-bar chart displaying cash flow month-by-month.
- **Category Spending Donut Chart**: Visual distribution of expenses with interactive tooltips and category breakdowns.
- **Daily Cashflow Area Trend**: Day-to-day spending pattern and timeline.

### 5. ✏️ Edit & Delete Transactions
- **Edit Modal**: Update any transaction's title, amount, date, type, category, or note on the fly.
- **Safe Deletion**: Deletion confirmation dialog prevents accidental loss of data.
- **Instant Search & Filter**: Filter transactions by type (All, Expense, Income), category, or keyword search.
- **Flexible Sorting**: Sort transactions by newest first, oldest first, amount high-to-low, or amount low-to-high.

### 6. 🎯 Category Budget Goals
- Set custom spending limits for categories such as Food, Shopping, Travel, and Education.
- Visual progress bars with alert statuses:
  - 🟢 **Normal**: Under 80% of limit
  - 🟡 **Warning**: 80% to 100% of limit
  - 🔴 **Danger**: Over budget alert with deficit amount

### 7. 💾 Multi-Currency, CSV Export/Import & Offline Storage
- **Multi-Currency Support**: Switch between USD ($), EUR (€), GBP (£), INR (₹), CAD ($), AUD ($), JPY (¥), and SGD ($).
- **CSV Export & Import**: Download your transactions to a CSV file or import transactions anytime.
- **100% LocalStorage Persistence**: Your records remain saved locally in your browser with complete privacy.
- **Preloaded Demo Dataset**: Load sample data anytime to test features immediately.
- **Dark Mode & Light Mode**: Seamless theme toggle with system preference detection.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sohamhazraff-beep/Personal-Finance-Expense-Tracker.git
   cd Personal-Finance-Expense-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the URL shown in your terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled assets will be located in the `dist/` directory ready for deployment.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```text
Personal-Finance-Expense-Tracker/
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js               # Vite bundler configuration
├── src/
│   ├── main.jsx                 # React root DOM rendering
│   ├── App.jsx                  # Main dashboard layout & modal controls
│   ├── index.css                # Tailwind styling & global styles
│   ├── components/
│   │   ├── Navbar.jsx           # Header, currency selector, theme toggle & actions
│   │   ├── SummaryCards.jsx     # Income, Expenses & Net Savings metric cards
│   │   ├── ChartsSection.jsx    # Monthly bar chart, category donut, & daily trend
│   │   ├── BudgetSection.jsx    # Category budget limit tracker & progress bars
│   │   ├── TransactionList.jsx  # Search, filter, sort, paginate & list transactions
│   │   ├── TransactionModal.jsx # Add & Edit transaction modal form
│   │   ├── DeleteConfirmModal.jsx # Delete confirmation prompt
│   │   ├── CategoryIcon.jsx     # Dynamic category Lucide icon mapper
│   │   └── Toast.jsx            # Toast notifications popup
│   ├── context/
│   │   └── FinanceContext.jsx   # Global state, localStorage syncing, calculations
│   ├── constants/
│   │   ├── categories.js        # Category definitions, colors & metadata
│   │   └── currencies.js        # Supported currency formats
│   └── data/
│       └── initialData.js       # Prepopulated realistic demo transactions
└── README.md                    # Project documentation
```

---

## 💡 How to Use

1. **Add a Transaction**:
   - Click the green **`+ Add Transaction`** button in the navbar.
   - Choose **Expense** or **Income**.
   - Input the amount, select a category (e.g., Food, Shopping, Travel, Education), date, and payment method.
   - Click **Add Transaction** to save.

2. **Analyze Your Spending**:
   - Review the **Total Income**, **Total Expenses**, and **Net Savings** cards.
   - Switch between **Monthly Flow**, **Category Spending**, and **Daily Cashflow** charts.
   - Use the period dropdown to filter by specific months.

3. **Edit or Delete**:
   - In the transaction table, click the **Pencil icon** to edit any details.
   - Click the **Trash icon** to safely delete with a confirmation modal.

4. **Set Category Budgets**:
   - In the **Category Budgets & Goals** section, click the edit icon next to any category limit to update your budget target.

5. **Export & Backup**:
   - Click the **Download (Export)** icon in the header to export your transactions to a CSV file.
   - Click the **Upload (Import)** icon to load transactions from any CSV.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
