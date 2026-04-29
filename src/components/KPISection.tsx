import { cn } from "../lib/utils";

const kpiCards = [
  {
    label: "Total Impressions",
    value: "2.1M",
    subtext: "10% Increase from Last Week",
    positive: true,
    bg: "bg-[#fde8d8]",
    arrowColor: "text-orange-500",
  },
  {
    label: "Total Clicks",
    value: "843.5k",
    subtext: "12% Increase from Last Week",
    positive: true,
    bg: "bg-[#ddf3e4]",
    arrowColor: "text-green-500",
  },
  {
    label: "Avg. CTR",
    value: "5.1%",
    subtext: "3% Decrease from Last Week",
    positive: false,
    bg: "bg-[#daeef9]",
    arrowColor: "text-blue-400",
  },
  {
    label: "Total Spend",
    value: "$54.2k",
    subtext: "16% Decrease from Last Week",
    positive: false,
    bg: "bg-gray-900",
    arrowColor: "text-gray-400",
    dark: true,
  },
] as const;

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function ArrowDownRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7l10 10M17 17H7M17 17V7" />
    </svg>
  );
}

function DollarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function KPISection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Analytics Overview
        </h2>
        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-500 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
          Last 9 Months
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={cn(
              "relative rounded-2xl p-5 flex flex-col justify-between min-h-32.5",
              card.bg,
            )}
          >
            {/* Top-right icon */}
            <div className="absolute top-4 right-4">
              {"dark" in card && card.dark ? (
                <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                  <DollarIcon className="w-3.5 h-3.5 text-gray-300" />
                </div>
              ) : card.positive ? (
                <ArrowUpRight className={cn("w-4 h-4", card.arrowColor)} />
              ) : (
                <ArrowDownRight className={cn("w-4 h-4", card.arrowColor)} />
              )}
            </div>

            {/* Value + Label */}
            <div>
              <p
                className={cn(
                  "text-3xl font-bold tracking-tight",
                  "dark" in card && card.dark ? "text-white" : "text-stone-800",
                )}
              >
                {card.value}
              </p>
              <p
                className={cn(
                  "text-sm font-medium mt-1",
                  "dark" in card && card.dark
                    ? "text-gray-400"
                    : "text-stone-500",
                )}
              >
                {card.label}
              </p>
            </div>

            {/* Subtext */}
            <p
              className={cn(
                "text-xs mt-3",
                "dark" in card && card.dark
                  ? "text-gray-500"
                  : "text-stone-400",
              )}
            >
              {card.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
