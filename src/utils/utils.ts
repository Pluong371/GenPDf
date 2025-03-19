import type {
  ListBalanceSheet,
  ListIncomeStatement,
  ListIndirectMethod,
  IndustryDataModel,
  TopCompanyByNetRevenueModel,
  Branches,
  Subsidiaries,
  Affiliates,
  FinancialHealthRatios,
  ProfitabilityRatios,
  GrowthRatios,
  ManagementEfficiencyRatios,
  CompanyPerformanceReview,
} from "../models/pdf.model";

export function processDataChart(data: any): any {
  return data
    .map((item: any) => ({
      label: item.EnLabel || item.EnTitle || "Unknown",
      value: typeof item.Y === "number" && !isNaN(item.Y) ? item.Y : 0,
    }))
    .filter((item: any) => item.value > 0);
}
/**
 * Làm phẳng mảng và xử lý dữ liệu theo hàm xử lý được cung cấp
 * @param arr Mảng cần làm phẳng và xử lý
 * @param processor Hàm xử lý dữ liệu
 * @returns Mảng đã được làm phẳng và xử lý
 */
export function flattenAndProcess<T, R>(
  arr: any[],
  processor: (item: T) => R
): R[] {
  // Kiểm tra đầu vào
  if (!Array.isArray(arr)) {
    return [];
  }

  const flattenedArray: T[] = [];
  arr.forEach((subArray) => {
    if (Array.isArray(subArray)) {
      subArray.forEach((item) => flattenedArray.push(item));
    } else {
      flattenedArray.push(subArray);
    }
  });

  return flattenedArray.map(processor);
}

/**
 * Xử lý dữ liệu ListBalanceSheet
 * @param item Phần tử trong ListBalanceSheet
 * @returns Phần tử đã được xử lý
 */
export function processBalanceSheetItem(item: ListBalanceSheet): any {
  const Level = parseInt(item.Level || "0");
  return {
    ...item,
    title: item.EnTitle || item.Title,
    level: Level,
    isMainTitle: Level === 0,
    isSection: Level === 1,
    isSubItem: Level === 2,
    values: {
      year2023: item.ListValues?.[0]?.Value,
      year2022: item.ListValues?.[1]?.Value,
      year2021: item.ListValues?.[2]?.Value,
    },
  };
}
export function processManagementEfficiencyRatios(item: ManagementEfficiencyRatios): any {
  const handleNullValue = (value: any) => {
    return value === null || value === undefined ? "N/A" : value;
  };
  return {
    ...item,
    title: item.EnTitle || item.Title,
    values: {
      year2021: handleNullValue(item.DataChart?.[0]?.Y),
      year2022: handleNullValue(item.DataChart?.[1]?.Y),
      year2023: handleNullValue(item.DataChart?.[2]?.Y),
    },
  };
}   
export function processIncomeStatementItem(item: ListIncomeStatement): any {
  const Level = parseInt(item.Level || "0");
  return {
    ...item,
    title: item.EnTitle || item.Title,
    level: Level,
    isMainTitle: Level === 0,
    isSection: Level === 1,
    isSubItem: Level === 2,
    values: {
      year2023: item.ListValues?.[0]?.Value,
      year2022: item.ListValues?.[1]?.Value,
      year2021: item.ListValues?.[2]?.Value,
    },
  };
}
export function processCashFlowStatement(item: ListIndirectMethod): any {
  const Level = parseInt(item.Level || "0");
  return {
    ...item,
    title: item.EnTitle || item.Title,
    level: Level,
    isMainTitle: Level === 0,
    isSection: Level === 1,
    isSubItem: Level === 2,
    values: {
      year2023: item.ListValues?.[0]?.Value,
      year2022: item.ListValues?.[1]?.Value,
      year2021: item.ListValues?.[2]?.Value,
    },
  };
}
export function processIndustryData(item: IndustryDataModel): any {
  const handleNullValue = (value: any) => {
    return value === null || value === undefined ? "N/A" : value;
  };
  return {
    ...item,
    title: item.EnTitle || item.Title,
    cagr: handleNullValue(item.Cagr),
    values: {
      year2023: handleNullValue(item.IndustryValues?.[0]?.Value),
      year2022: handleNullValue(item.IndustryValues?.[1]?.Value),
      year2021: handleNullValue(item.IndustryValues?.[2]?.Value),
    },
  };
}
export function processFinancialHealthRatios(item: FinancialHealthRatios): any {
  const handleNullValue = (value: any) => {
    return value === null || value === undefined ? "N/A" : value;
  };
  return {
    ...item,
    title: item.EnTitle || item.Title,
    values: {
      year2021: handleNullValue(item.DataChart?.[0]?.Y),
      year2022: handleNullValue(item.DataChart?.[1]?.Y),
      year2023: handleNullValue(item.DataChart?.[2]?.Y),
    },
  };
}



export function processGrowthRatios(item: GrowthRatios): any {
    const handleNullValue = (value: any) => {
      return value === null || value === undefined ? "N/A" : value;
    };
    return {
      ...item,
      title: item.EnTitle || item.Title,
      values: {
        year2021: handleNullValue(item.DataChart?.[0]?.Y),
        year2022: handleNullValue(item.DataChart?.[1]?.Y),
        year2023: handleNullValue(item.DataChart?.[2]?.Y),
      },
    };
  }



  export function processProfitabilityRatios(item: ProfitabilityRatios): any {
    const handleNullValue = (value: any) => {
      return value === null || value === undefined ? "N/A" : value;
    };
    return {
      ...item,
      title: item.EnTitle || item.Title,
      values: {
        year2021: handleNullValue(item.DataChart?.[0]?.Y),
        year2022: handleNullValue(item.DataChart?.[1]?.Y),
        year2023: handleNullValue(item.DataChart?.[2]?.Y),
      },
    };
  }
  export function processCompanyPerformanceReview(item: CompanyPerformanceReview): any {
    const handleNullValue = (value: any) => {
      return value === null || value === undefined ? "N/A" : value;
    };
    return {
      ...item,
      title: item.EnTitle || item.Title,
      values: {
        year2021: handleNullValue(item.DataChart?.[0]?.Y),
        year2022: handleNullValue(item.DataChart?.[1]?.Y),
        year2023: handleNullValue(item.DataChart?.[2]?.Y),
      },
    };
  }

export function processTopCompanyByNetRevenue(
  item: TopCompanyByNetRevenueModel
): any {
  const handleNullValue = (value: any) => {
    return value === null || value === undefined ? "N/A" : value;
  };
  const formatStringToNumber = (value: string) => {
    if (value === null || value === undefined) return "N/A";

    if (typeof value === "string") {
      const numValue = parseFloat(value.replace(/,/g, ""));
      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    return value;
  };
  return {
    ...item,

    companyEnName: handleNullValue(item.companyEnName),
    netRevenue: formatStringToNumber(item.netRevenue),
    netIncome: formatStringToNumber(item.netIncome),
    roa: handleNullValue(item.roa),
    roe: handleNullValue(item.roe),
    liability: handleNullValue(item.liability),
  };
}
export function processBranches(branches: Branches[]): any {
  if (!Array.isArray(branches)) return [];

  return branches.map((branch, index) => {
    return {
      ...branch,
      index: index + 1,
    };
  });
}

export function processSubsidiaries(subsidiaries: Subsidiaries[]): any {
  if (!Array.isArray(subsidiaries)) return [];

  return subsidiaries.map((subsidiaries, index) => {
    return {
      ...subsidiaries,
      index: index + 1,
    };
  });
}
export function processAffiliates(affiliates: Affiliates[]): any {
  if (!Array.isArray(affiliates)) return [];

  return affiliates.map((affiliates, index) => {
    return {
      ...affiliates,
      index: index + 1,
    };
  });
}

