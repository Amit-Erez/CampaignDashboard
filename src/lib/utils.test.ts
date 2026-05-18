// @vitest-environment jsdom
import { expect, test, describe } from "vitest";
import {
  applyFilters,
  decodeFiltersFromUrl,
  decodeSortConfig,
  encodeSortConfig,
  filterByChannel,
  filterByDateRange,
  filterBySearch,
  filterByStatus,
  sortCampaigns,
  updateFiltersInUrl,
  updateSortsInUrl,
} from "./utils";
import {
  CampaignChannel,
  CampaignStatus,
  type Campaign,
  type CampaignFilters,
  type SortConfig,
} from "../types";

const testsArray: Campaign[] = [
  {
    id: "1",
    name: "Green Ads",
    channel: CampaignChannel.Meta,
    status: CampaignStatus.Active,
    startDate: "2025-01-01",
    endDate: null,
    impressions: 1000,
    clicks: 100,
    conversions: 10,
    spend: 500,
    budget: 6000,
    weeklyMetrics: [
     {
        "weekStart": "2026-01-07",
        "spend": 151.52,
        "impressions": 7245,
        "clicks": 1764
      },
      {
        "weekStart": "2026-01-14",
        "spend": 241.94,
        "impressions": 11569,
        "clicks": 2817
      }],
    },
  {
    id: "2",
    name: "Blue Campaign",
    channel: CampaignChannel.Google,
    status: CampaignStatus.Paused,
    startDate: "2023-02-01",
    endDate: "2024-08-02",
    impressions: 1000,
    clicks: 400,
    conversions: 10,
    spend: 800,
    budget: 2000,
    weeklyMetrics: [
     {
        "weekStart": "2026-03-29",
        "spend": 62.49,
        "impressions": 4585,
        "clicks": 2169
      },
      {
        "weekStart": "2026-04-05",
        "spend": 58.83,
        "impressions": 4317,
        "clicks": 2042
      },
      {
        "weekStart": "2026-04-12",
        "spend": 68.45,
        "impressions": 5023,
        "clicks": 2376
      }],
  },
  {
    id: "3",
    name: "Growth Hack",
    channel: CampaignChannel.LinkedIn,
    status: CampaignStatus.Ended,
    startDate: "2023-03-01",
    endDate: "2023-08-05",
    impressions: 1000,
    clicks: 200,
    conversions: 10,
    spend: 900,
    budget: 4000,
    weeklyMetrics: [
     {
        "weekStart": "2026-06-21",
        "spend": 53.97,
        "impressions": 3960,
        "clicks": 1873
      }],
  },
  {
    id: "4",
    name: "Red Noses",
    channel: CampaignChannel.TikTok,
    status: CampaignStatus.Active,
    startDate: "2023-04-01",
    endDate: null,
    impressions: 1000,
    clicks: 400,
    conversions: 10,
    spend: 300,
    budget: 1000,
    weeklyMetrics: [
      {
        "weekStart": "2025-11-15",
        "spend": 3076.38,
        "impressions": 22928,
        "clicks": 9268
      },
      {
        "weekStart": "2025-11-22",
        "spend": 2245.11,
        "impressions": 16733,
        "clicks": 6764
      }],
  },
];

//
//
// ************************
// TESTING FILTER FUNCTIONS
// ************************
//
//

// Filter by search
// *****************

describe("filterBySearch", () => {
  test("function return matching campaigns for query", () => {
    const result = filterBySearch(testsArray, "gr");
    expect(result).toEqual([testsArray[0], testsArray[2]]);
  });

  test("function should be case-insensitive", () => {
    const result = filterBySearch(testsArray, "GR");
    expect(result).toEqual([testsArray[0], testsArray[2]]);
  });

  test("function should trim whitespace from query", () => {
    const result = filterBySearch(testsArray, "  GR  ");
    expect(result).toEqual([testsArray[0], testsArray[2]]);
  });

  test("function should return empty array when no matches found", () => {
    const result = filterBySearch(testsArray, "xyz");
    expect(result).toEqual([]);
  });

  test("function should return full array when query is empty", () => {
    const result = filterBySearch(testsArray, "");
    expect(result).toEqual(testsArray);
  });

  test("function should return full array when query is whitespace only", () => {
    const result = filterBySearch(testsArray, "   ");
    expect(result).toEqual(testsArray);
  });
});

// Filter by channel
// *****************

describe("filterByChannel", () => {
  // shortened array for third test only //
  const shorterArr = [testsArray[0], testsArray[1], testsArray[2]];

  test("function should return matching campaigns for channel", () => {
    const result = filterByChannel(testsArray, [
      CampaignChannel.Google,
      CampaignChannel.TikTok,
    ]);
    expect(result).toEqual([testsArray[1], testsArray[3]]);
  });

  test("function should return full array when no channel is chosen", () => {
    const result = filterByChannel(testsArray, []);
    expect(result).toEqual(testsArray);
  });

  test("function should return empty array when no selected channels match", () => {
    const result = filterByChannel(shorterArr, [CampaignChannel.TikTok]);
    expect(result).toEqual([]);
  });
});

// Filter by status
// *****************

describe("filterByStatus", () => {
  // shortened array for third test only //
  const shorterArr = [testsArray[0], testsArray[1], testsArray[3]];

  test("function should return matching campaigns for status", () => {
    const result = filterByStatus(testsArray, [
      CampaignStatus.Active,
      CampaignStatus.Ended,
    ]);
    expect(result).toEqual([testsArray[0], testsArray[2], testsArray[3]]);
  });

  test("function should return full array when no status is chosen", () => {
    const result = filterByStatus(testsArray, []);
    expect(result).toEqual(testsArray);
  });

  test("function should return empty array when no selected statuses match", () => {
    const result = filterByStatus(shorterArr, [CampaignStatus.Ended]);
    expect(result).toEqual([]);
  });
});

// Filter by Start Date Range
// ***************************

describe("filterByDateRange", () => {
  test("function should return campaigns within date range", () => {
    const result = filterByDateRange(testsArray, "2023-02-01", "2023-03-01");
    expect(result).toEqual([testsArray[1], testsArray[2]]);
  });

  test("function should return full array when no dates are selected", () => {
    const result = filterByDateRange(testsArray, null, null);
    expect(result).toEqual(testsArray);
  });

  test("function should return campaigns before or on end date when 'From' date is null", () => {
    const result = filterByDateRange(testsArray, null, "2023-03-01");
    expect(result).toEqual([testsArray[1], testsArray[2]]);
  });

  test("function should return campaigns after or on start date when 'To' date is null", () => {
    const result = filterByDateRange(testsArray, "2023-03-01", null);
    expect(result).toEqual([testsArray[0], testsArray[2], testsArray[3]]);
  });
});

// Layering filters via applyFilters
// search + channels + statuses + dates → combined result
// ******************************************************

describe("applyFilters", () => {
  test("function should apply multiple filters together", () => {
    const filters = {
      search: "a",
      channels: [CampaignChannel.Google, CampaignChannel.TikTok],
      statuses: [],
      startDateFrom: null,
      startDateTo: null,
    };
    const result = applyFilters(testsArray, filters);
    expect(result).toEqual([testsArray[1]]);
  });

  test("function should return full array when all filters are empty", () => {
    const filters = {
      search: "",
      channels: [],
      statuses: [],
      startDateFrom: null,
      startDateTo: null,
    };
    const result = applyFilters(testsArray, filters);
    expect(result).toEqual(testsArray);
  });

  test("function should return empty array when combined filters exclude all campaigns", () => {
    const filters = {
      search: "a",
      channels: [CampaignChannel.Google, CampaignChannel.TikTok],
      statuses: [CampaignStatus.Active],
      startDateFrom: null,
      startDateTo: null,
    };
    const result = applyFilters(testsArray, filters);
    expect(result).toEqual([]);
  });
});

//
//
// ******************************
// TESTING THE SORTING FUNCTION
// ******************************
//
//

describe("sortCampaigns", () => {
  test("return original order when sortConfig is empty", () => {
    const result = sortCampaigns(testsArray, []);
    expect(result.map((c) => c.id)).toEqual(["1", "2", "3", "4"]);
  });

  test("sort by one numeric field ascending", () => {
    const result = sortCampaigns(testsArray, [
      { key: "spend", direction: "asc" },
    ]);
    expect(result.map((c) => c.id)).toEqual(["4", "1", "2", "3"]);
  });

  test("sort by one numeric field descending", () => {
    const result = sortCampaigns(testsArray, [
      { key: "budget", direction: "desc" },
    ]);
    expect(result.map((c) => c.id)).toEqual(["1", "3", "2", "4"]);
  });

  test("sort by multiple fields as tie-breakers", () => {
    const result = sortCampaigns(testsArray, [
      { key: "clicks", direction: "asc" },
      { key: "spend", direction: "desc" },
    ]);
    expect(result.map((c) => c.id)).toEqual(["1", "3", "2", "4"]);
  });

  test("sort by string field descending", () => {
    const result = sortCampaigns(testsArray, [
      { key: "channel", direction: "desc" },
    ]);
    expect(result.map((c) => c.id)).toEqual(["4", "1", "3", "2"]);
  });

  test("sort by string field ascending", () => {
    const result = sortCampaigns(testsArray, [
      { key: "channel", direction: "asc" },
    ]);
    expect(result.map((c) => c.id)).toEqual(["2", "3", "1", "4"]);
  });

  test("should place null values last when sorting by endDate", () => {
    const result = sortCampaigns(testsArray, [
      { key: "endDate", direction: "asc" },
    ]);
    expect(result.map((c) => c.id)).toEqual(["3", "2", "1", "4"]);
  });
});

//*************************************
// TESTING URL<-->sortConfig ENCODE/DECODE FUNCTIONS
//**************************************

// String value from URL --> turned into a sortConfig object
describe("decodeSortConfig", () => {
  test("should return a sortConfig object when given a 'sort' string value", () => {
    const value: string = "channel:asc,spend:desc";
    const result: SortConfig[] = decodeSortConfig(value);
    expect(result).toEqual([
      { key: "channel", direction: "asc" },
      { key: "spend", direction: "desc" },
    ]);
  });

  test("should return empty array when value is null", () => {
    const result = decodeSortConfig(null);
    expect(result).toEqual([]);
  });

  test("should return empty array when value is an empty string", () => {
    const result = decodeSortConfig("");
    expect(result).toEqual([]);
  });
});

// sortConfig object --> turned into a string value for URL
describe("encodeSortConfig", () => {
  test("should return a sort params string when given a sortConfig array - 1 sort", () => {
    const value: SortConfig[] = [{ key: "channel", direction: "asc" }];
    const result: string = encodeSortConfig(value);
    expect(result).toEqual("channel:asc");
  });

  test("should return a sort params string when given a sortConfig array - 2 sort rules", () => {
    const value: SortConfig[] = [
      { key: "channel", direction: "asc" },
      { key: "spend", direction: "desc" },
    ];
    const result: string = encodeSortConfig(value);
    expect(result).toEqual("channel:asc,spend:desc");
  });

  test("should return an empty string when receiving an empty array", () => {
    const result: string = encodeSortConfig([]);
    expect(result).toEqual("");
  });
});

// URL params turned into 'filters' object
describe("decodeFiltersFromUrl", () => {
  test("should return a 'filters' object when given string value of URL params", () => {
    const value = "?channels=Google&statuses=Paused&search=tr";
    const result: CampaignFilters = decodeFiltersFromUrl(value);
    expect(result).toEqual({
      search: "tr",
      statuses: ["Paused"] as CampaignStatus[],
      channels: ["Google"] as CampaignChannel[],
      startDateFrom: null,
      startDateTo: null,
    });
  });
});

// when 'filters' object is updated - URL params should update accordingly
describe("updateFiltersInUrl", () => {
  test("should update URL with search filter", () => {
    window.history.pushState(null, "", "/");
    updateFiltersInUrl({
      search: "test",
      statuses: [],
      channels: [],
      startDateFrom: null,
      startDateTo: null,
    });
    expect(window.location.search).toBe("?search=test");
  });

  test("should remove filter from URL when filter value is reset to empty", () => {
    window.history.pushState(null, "", "/?search=test");
    updateFiltersInUrl({
      search: "",
      statuses: [],
      channels: [],
      startDateFrom: null,
      startDateTo: null,
    });
    expect(window.location.search).toBe("");
  });

  test("should update URL correctly with an arrayed filter", () => {
    window.history.pushState(null, "", "/");
    updateFiltersInUrl({
      search: "",
      statuses: [],
      channels: [CampaignChannel.Google, CampaignChannel.Meta],
      startDateFrom: null,
      startDateTo: null,
    });
    expect(window.location.search).toContain("channels=Google%2CMeta");
  });
});

// when sortConfig is updated - URL params should update accordingly
describe("updateSortsInUrl", () => {
  test("should update URL with sortConfig", () => { 
    window.history.pushState(null, "", "/");
    updateSortsInUrl([
      { key: "channel", direction: "asc" },
      { key: "spend", direction: "desc" },
    ]);
    expect(window.location.search).toBe("?sort=channel%3Aasc%2Cspend%3Adesc");
  });

  test("should remove 'sort' from URL when sortConfig is empty", () => {
    window.history.pushState(null, "", "/?sort=channel%3Aasc%2Cspend%3Adesc");
    updateSortsInUrl([]);
    expect(window.location.search).toBe("");
    });

    test("should update only 'sort' param in URL when other params exist", () => {
      window.history.pushState(null, "", "/?search=test");
      updateSortsInUrl([{ key: "channel", direction: "asc" }]);
      expect(window.location.search).toBe("?search=test&sort=channel%3Aasc"); 
  });
});
