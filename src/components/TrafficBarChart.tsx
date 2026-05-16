import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Campaign } from "../types";

export default function TrafficBarChart({
  selectedCampaign,
}: {
  selectedCampaign: Campaign;
}) {
  const data = selectedCampaign.weeklyMetrics.map((metric) => ({
    weeks: metric.weekStart,
    Impressions: metric.impressions,
    Clicks: metric.clicks,
  }));

  return (
    <div className="flex items-center justify-center h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weeks" tick={{ fontSize: 12 }} />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Impressions"
            fill="#8884d8"
            activeBar={{ fill: "#8484d8", stroke: "blue" }}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Clicks"
            fill="#82ca9d"
            activeBar={{ fill: "#96ca9d", stroke: "teal" }}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
