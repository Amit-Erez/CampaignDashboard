import { avgCtr, cn, totals } from "../lib/utils";
import type { Campaign } from "../types";

// function ArrowUpRight({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M7 17L17 7M17 7H7M17 7v10" />
//     </svg>
//   );
// }

// function ArrowDownRight({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M7 7l10 10M17 17H7M17 17V7" />
//     </svg>
//   );
// }

              // ) : card.positive ? (
              //   <ArrowUpRight className={cn("w-4 h-4", card.arrowColor)} />
              // ) : (
              //   <ArrowDownRight className={cn("w-4 h-4", card.arrowColor)} />

function DollarIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
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

export function KPISection({filtered}: {filtered: Campaign[]}) {

  const kpiCards = [
  {
    label: "Total Spend",
    value: totals(filtered, "spend"),
    positive: false,
    bg: "bg-gray-700",
    arrowColor: "text-gray-400",
    dark: true,
  },
  {
    label: "Avg. CTR",
    value: avgCtr(filtered),
    positive: false,
    bg: "ctr-blue",
    arrowColor: "text-blue-800",
    dark: false,
  },
  {
    label: "Total Impressions",
    value: totals(filtered, "impressions"),
    positive: true,
    bg: "imp-violet",
    arrowColor: "text-black-500",
    dark: false,
  },
  {
    label: "Total Conversions",
    value: totals(filtered, "conversions"),
    positive: true,
    bg: "conv-mint",
    arrowColor: "text-green-500",
    dark: false,
  },
] as const;

  return (
    <section aria-labelledby="analytics-overview-heading" className="w-full">
      {/* Section Header */} 
      <div className="flex items-center justify-between mb-5">
        <h2 id="analytics-overview-heading" className="text-xxl font-semibold text-gray-900">
          Analytics Overview
        </h2>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={cn(
              "relative rounded-2xl p-5 flex flex-col justify-center sm:min-h-32.5 shadow-md",
              card.bg,
            )}
          >
            {/* Top-right icon */}
            <div className="absolute top-4 right-4">
              {card.dark && (
                <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center">
                  <DollarIcon className="w-3.5 h-3.5 text-gray-00" />
                </div>
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
                    ? "text-gray-300"
                    : "text-stone-800",
                )}
              >
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
