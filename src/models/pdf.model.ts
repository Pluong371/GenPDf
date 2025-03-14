export interface VsicInfo {
  name: string;
  NameEn: string;
  code: string;
}

export interface CompanyProfile {
  generalInformation: generalInformationResponse;
  ownershipStructure: ownershipStructureResponse;
  companyProfileResponse: companyProfileResponse;
  companyImportExportResponse: companyImportExportResponse;
  industryDataModel: industryDataModel[];
  topCompanyByNetRevenueModel: topCompanyByNetRevenueModel[];
  financialReportResponse: financialReportResponse;
}





export interface Branch {
  companyId: string;
  taxCode: string;
  name: string;
  nameEn: string;
  address: string;
}

export interface Ownership {
  name: string;
  amount: number;
  ownership: number;
  updateDate: string;
}

//chưa có
export interface CorporateHold {
  name: string;
  amount: number;
  ownership: number;
  updateDate: string;
}

export interface OwnershipStructureChart {
  otherData: number;
  label: string;
  enLabel: string;
  y: number;
}

export interface generalInformationResponse {
  companyId: string;
  companyEnName: string;
  companyName: string;
  VsicInfo: VsicInfo[];
  address: string;
  phoneNumber: string;
  email: string;
  fax: string;
  webSite: string;
  registrationCode: string;
  incorporatedDate: string;
  legalForm: string;
  operationStatus: boolean;
  businessSize: string;
  representativeName: string;
  charterCapital: string;
  noOfEmployee: number;
  latestUpdate: string;
  netRevenue: number;
}

export interface Subsidiary {
  companyId: string;
  taxCode: string;
  name: string;
  nameEn: string;
  ownership: number;
  vsicInfo: string;
  vsicEnInfo: string;
  companyLinkStatus: string;
  companyLinkStatusId: number;
}
export interface Affliate {
  companyId: string;
  taxCode: string;
  name: string;
  nameEn: string;
  ownership: number;
  vsicInfo: string;
  vsicEnInfo: string;
}

export interface ownershipStructureResponse {
  corporateHold: CorporateHold[];
  privateHold: Ownership[];
  //chưa có
  foreignHold: Ownership[];

  ownershipStructureCharts: OwnershipStructureChart[];
}
export interface companyProfileResponse {
  branches: Branch[][];
  subsidiaries: Subsidiary[][];
  affiliates: Affliate[][];
}
export interface DataChart {
  otherData: number;
  label: string;
  enLabel: string;
  y: number;
}
export interface ChartModel {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface ImportAndExportData {
  title: string;
  enTitle: string;
  chartModels: ChartModel[];
}
export interface ImportShareWeightRatioData {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface ExportShareWeightRatioData {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface companyImportExportResponse {
  importAndExportData: ImportAndExportData;
  importShareWeightRatioData: ImportShareWeightRatioData;
  exportShareWeightRatioData: ExportShareWeightRatioData;
}
export interface topCompanyByNetRevenueModel {
  companyId: string;
  companyName: string;
  companyEnName: string;
  netRevenue: number;
  netIncome: number;
  roa: number;
  roe: number;
  liability: number;
}
export interface IndustryValue {
  years: string;
  value: number;
}
export interface industryDataModel {
  title: string;
  enTitle: string;
  cagr: number;
  industryValues: IndustryValue[];
}
export interface BalanceSheet {
  title: string;
  enTitle: string;
  code: string;
  level: string;
  listValues: Value[];
}
export interface Value {
  name: string;
  nameEn: string;
  value: number;
}
export interface IncomeStatement {
  title: string;
  enTitle: string;
  code: string;
  level: string;
  listValues: Value[];
}
export interface CashFlowStatement {
    //chưa có
  listDirectMethod: string;
  listIndirectMethod: listIndirectMethod[];
}
export interface listIndirectMethod {
  title: string;
  enTitle: string;
  code: string;
  level: string;
  listValues: Value[];
}
export interface financialReportResponse {
  set: number;
  listBalanceSheet: BalanceSheet[];
  listIncomeStatement: IncomeStatement[];
  cashFlowStatement: CashFlowStatement[];
  financialHighlight:financialHighlight;
  financialAnalysis:financialAnalysis;
}
export interface financialAnalysis {
  financialHealthRatios: FinancialHealthRatios[];
  managementEfficiencyRatios: ManagementEfficiencyRatios[];
  profitabilityRatios: ProfitabilityRatios[];
  growthRatios: GrowthRatios[];
}
export interface GrowthRatios {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface FinancialHealthRatios {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface ManagementEfficiencyRatios {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface ProfitabilityRatios {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface financialHighlight {
  contributedCapital: number;
  netRevenue: number;
  netProfit: number;
  totalAssets: number;
  ownerEquity: number;
  roe: number;
  roa: number;
  updatePeriod: string;
  companyPerformanceReview: CompanyPerformanceReview[];
  assetBreakdown: AssetBreakdown[];
  expenseBreakdown: ExpenseBreakdown[];
}
export interface ExpenseBreakdown {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface AssetBreakdown {
  dataChart: DataChart[];
  title: string;
  enTitle: string;
  chartType: string;
}
export interface CompanyPerformanceReview {
    dataChart: DataChart[];
    title: string;
    enTitle: string;
    chartType: string;
}
