export type Campaign = {
  id: string;
  name: string;
  brand: string;
  image: string;
  status: "active" | "paused" | "completed";
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  startDate: string;
};
