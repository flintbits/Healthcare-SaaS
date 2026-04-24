type AnalyticsChartControlsProps = {
  monthNames: string[];
  selectedMonth: number;
  selectedYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
};

export default function AnalyticsChartControls({
  monthNames,
  selectedMonth,
  selectedYear,
  onPreviousMonth,
  onNextMonth,
  onMonthChange,
  onYearChange,
}: AnalyticsChartControlsProps) {
  return (
    <section className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onPreviousMonth}
          className="rounded-lg p-2 hover:bg-white/10 transition-colors"
          title="Previous month"
        >
          <span className="sr-only">Previous month</span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-slate-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer"
          >
            {monthNames.map((month, idx) => (
              <option key={month} value={idx + 1} className="bg-slate-900">
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer"
          >
            {[selectedYear - 2, selectedYear - 1, selectedYear, selectedYear + 1].map(
              (year) => (
                <option key={year} value={year} className="bg-slate-900">
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        <button
          onClick={onNextMonth}
          className="rounded-lg p-2 hover:bg-white/10 transition-colors"
          title="Next month"
        >
          <span className="sr-only">Next month</span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-slate-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <span className="text-sm text-white/40">
        {monthNames[selectedMonth - 1]} {selectedYear}
      </span>
    </section>
  );
}
