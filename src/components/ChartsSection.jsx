import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  BarChart3,
  PieChart as PieIcon,
  LineChart as AreaIcon,
  Info,
  Layers
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../constants/currencies';
import { CategoryIcon } from './CategoryIcon';
import { EXPENSE_CATEGORIES } from '../constants/categories';

export const ChartsSection = () => {
  const {
    monthlyChartData,
    categorySpendingData,
    dailySpendingData,
    currency,
    theme
  } = useFinance();

  const [activeChartTab, setActiveChartTab] = useState('monthly'); // 'monthly', 'category', 'trend'

  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#334155' : '#f1f5f9';
  const textFill = isDark ? '#94a3b8' : '#64748b';

  // Custom Tooltip for Monthly Bar Chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs space-y-1.5 min-w-[150px]">
          <p className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="capitalize">{entry.name}:</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {formatCurrency(entry.value, currency)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Category Pie Chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            {data.name}
          </p>
          <div className="flex items-center justify-between gap-4 text-slate-600 dark:text-slate-300">
            <span>Amount:</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {formatCurrency(data.value, currency)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-600 dark:text-slate-300">
            <span>Share:</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {data.percentage}%
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-500 text-[11px]">
            <span>Transactions:</span>
            <span className="tabular-nums">{data.count}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const { list: categoryList, totalExpense } = categorySpendingData;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
      {/* Header with Title and View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            Financial Analytics & Charts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize income, monthly expense comparisons, and categorized spending
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveChartTab('monthly')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeChartTab === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Monthly Flow</span>
          </button>
          <button
            onClick={() => setActiveChartTab('category')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeChartTab === 'category'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PieIcon className="w-4 h-4" />
            <span>Category Spending</span>
          </button>
          <button
            onClick={() => setActiveChartTab('trend')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeChartTab === 'trend'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AreaIcon className="w-4 h-4" />
            <span>Daily Cashflow</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="pt-6">
        {activeChartTab === 'monthly' && (
          <div>
            <div className="h-72 sm:h-80 w-full">
              {monthlyChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyChartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke={textFill}
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: gridStroke }}
                    />
                    <YAxis
                      stroke={textFill}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend
                      wrapperStyle={{ paddingTop: '16px', fontSize: '13px' }}
                      formatter={(val) => <span className="text-slate-700 dark:text-slate-300 font-medium capitalize">{val}</span>}
                    />
                    <Bar
                      dataKey="income"
                      name="Income"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                    />
                    <Bar
                      dataKey="expense"
                      name="Expenses"
                      fill="#f43f5e"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                  No monthly transaction data available.
                </div>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>Comparing monthly income vs expenses breakdown</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                Green = Inflow | Rose = Outflow
              </span>
            </div>
          </div>
        )}

        {activeChartTab === 'category' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Donut Chart */}
            <div className="lg:col-span-5 h-64 sm:h-72 relative flex items-center justify-center">
              {categoryList.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip content={<CustomPieTooltip />} />
                      <Pie
                        data={categoryList}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                      >
                        {categoryList.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Stat */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Total Spent
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatCurrency(totalExpense, currency)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-slate-400 text-sm">No expenses in this period.</div>
              )}
            </div>

            {/* Category breakdown cards / list */}
            <div className="lg:col-span-7">
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {categoryList.map((cat) => {
                  const meta = EXPENSE_CATEGORIES.find(c => c.id === cat.id);
                  return (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                        >
                          <CategoryIcon iconName={meta?.icon || 'HelpCircle'} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {cat.count} {cat.count === 1 ? 'transaction' : 'transactions'}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 ml-3">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                          {formatCurrency(cat.value, currency)}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500 tabular-nums">
                          {cat.percentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeChartTab === 'trend' && (
          <div>
            <div className="h-72 sm:h-80 w-full">
              {dailySpendingData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dailySpendingData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                    <XAxis
                      dataKey="displayDate"
                      stroke={textFill}
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: gridStroke }}
                    />
                    <YAxis
                      stroke={textFill}
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="income"
                      name="Income"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      name="Expenses"
                      stroke="#f43f5e"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorExpense)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                  No daily spending activity recorded yet.
                </div>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Day-to-day cashflow timeline</span>
              <span className="font-medium text-slate-400">Cumulative Daily Activity</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
