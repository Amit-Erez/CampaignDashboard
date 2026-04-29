

export type Campaign = {
  id: string;
  name: string;
  channel: "Google" | "Meta" | "LinkedIn" | "TikTok";
  status: "Active" | "Paused" | "Ended";
  startDate: string;
  endDate: string | null;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  budget: number;
};
