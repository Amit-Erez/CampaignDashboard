import { expect, test, describe } from "vitest";
import { applyFilters, filterByChannel, filterByDateRange, filterBySearch, filterByStatus } from "./utils";
import { CampaignChannel, CampaignStatus, type Campaign } from "../types";

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
    budget: 1000,
  },
  {
    id: "2",
    name: "Blue Campaign",
    channel: CampaignChannel.Google,
    status: CampaignStatus.Paused,
    startDate: "2023-02-01",
    endDate: null,
    impressions: 1000,
    clicks: 100,
    conversions: 10,
    spend: 500,
    budget: 1000,
  },
  {
    id: "3",
    name: "Growth Hack",
    channel: CampaignChannel.LinkedIn,
    status: CampaignStatus.Ended,
    startDate: "2023-03-01",
    endDate: null,
    impressions: 1000,
    clicks: 100,
    conversions: 10,
    spend: 500,
    budget: 1000,
  },
  {
    id: "4",
    name: "Red Noses",
    channel: CampaignChannel.TikTok,
    status: CampaignStatus.Active,
    startDate: "2023-04-01",
    endDate: null,
    impressions: 1000,
    clicks: 100,
    conversions: 10,
    spend: 500,
    budget: 1000,
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
        const result = filterByDateRange(testsArray, "2023-02-01", "2023-03-01")
        expect(result).toEqual([testsArray[1], testsArray[2]])
    })

    test("function should return full array when no dates are selected", () => {
        const result = filterByDateRange(testsArray, null, null)
        expect(result).toEqual(testsArray)
    })

        test("function should return campaigns before or on end date when 'From' date is null", () => {
        const result = filterByDateRange(testsArray, null, "2023-03-01")
        expect(result).toEqual([testsArray[1], testsArray[2]])
    })

    test("function should return campaigns after or on start date when 'To' date is null", () => {
        const result = filterByDateRange(testsArray, "2023-03-01", null)
        expect(result).toEqual([testsArray[0], testsArray[2], testsArray[3]])
    })

})

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
        }
        const result = applyFilters(testsArray, filters)
        expect(result).toEqual([testsArray[1]])        
    })

    test("function should return full array when all filters are empty", () => {
        const filters = {
            search: "",
            channels: [], 
            statuses: [],
            startDateFrom: null,
            startDateTo: null,
        }
        const result = applyFilters(testsArray, filters)
        expect(result).toEqual(testsArray)
    })

    test("function should return empty array when combined filters exclude all campaigns", () => {
        const filters = {
            search: "a",
            channels: [CampaignChannel.Google, CampaignChannel.TikTok], 
            statuses: [CampaignStatus.Active],
            startDateFrom: null,
            startDateTo: null,
        }
        const result = applyFilters(testsArray, filters)
        expect(result).toEqual([])  
    })
})
