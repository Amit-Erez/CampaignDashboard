const fs = require("node:fs");
const path = require("node:path");
const campaigns = require("./src/data/campaigns.json");

const outputPath = path.join(
  process.cwd(),
  "src/data/campaigns-generated.json",
);

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function generateWeeklyMetrics(campaign) {
  const start = new Date(campaign.startDate);
  const end = campaign.endDate
    ? new Date(campaign.endDate)
    : addDays(start, 30);

  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;

  const totalWeeks = Math.ceil((end - start) / millisecondsPerWeek);
  const baseImpressions = Math.floor(campaign.impressions / totalWeeks);
  const impressionsRemainder = campaign.impressions % totalWeeks;
  const clicksRemainder = campaign.clicks % totalWeeks;
  const spendInCents = Math.round(campaign.spend * 100);
  const baseSpend = Math.floor(spendInCents / totalWeeks);
  const spendRemainder = spendInCents % totalWeeks;

  const weights = Array.from({ length: totalWeeks }, () => {
    return 0.7 + Math.random() * 0.6;
  });

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  const weeklyMetrics = [];

  for (let i = 0; i < totalWeeks; i++) {
    const share = weights[i] / totalWeight;
    const currentDate = addDays(start, i * 7);
    const weeklySpendInCents =
      i === totalWeeks - 1
        ? spendInCents -
          weeklyMetrics.reduce(
            (sum, week) => sum + Math.round(week.spend * 100),
            0,
          )
        : Math.round(spendInCents * share);
    const weeklySpend = weeklySpendInCents / 100;
    const weeklyImpressions =
      i === totalWeeks - 1
        ? campaign.impressions -
          weeklyMetrics.reduce((sum, week) => sum + week.impressions, 0)
        : Math.round(campaign.impressions * share);
    const weeklyClicks =
      i === totalWeeks - 1
        ? campaign.clicks -
          weeklyMetrics.reduce((sum, week) => sum + week.clicks, 0)
        : Math.round(campaign.clicks * share);

    weeklyMetrics.push({
      weekStart: currentDate.toISOString().split("T")[0],
      spend: weeklySpend,
      impressions: weeklyImpressions,
      clicks: weeklyClicks,
    });
  }
  return weeklyMetrics;
}

const updatedCampaigns = campaigns.map((campaign) => ({
  ...campaign,
  weeklyMetrics: generateWeeklyMetrics(campaign),
}));

fs.writeFileSync(outputPath, JSON.stringify(updatedCampaigns, null, 2));

console.log(
  "Generated weekly metrics for",
  updatedCampaigns.length,
  "campaigns",
);

// fs.writeFileSync(outputPath, JSON.stringify(campaigns, null, 2));
