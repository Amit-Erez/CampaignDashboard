import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import type { Campaign } from "../types";

export default function SpendLineChart({
  selectedCampaign,
}: {
  selectedCampaign: Campaign;
}) {
  const data = selectedCampaign.weeklyMetrics.map((metric) => ({
    weeks: metric.weekStart,
    spend: metric.spend,
  }));

  return (
    <div className="flex items-center justify-center h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          responsive
          data={data}
          margin={{
            top: 40,
            right: 20,
            bottom: 5,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="spend"
            stroke="purple"
            strokeWidth={2}
            name="Weekly Spend Over Time"
          />
          <XAxis dataKey="weeks" tick={{ fontSize: 12 }} />
          <YAxis
            width="auto"
            label={{ value: "Spend", position: "insideLeft", angle: -90 }}
          />
          <Legend align="right" />
          <Tooltip formatter={(value) => [`$${value}`, "Spend"]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
