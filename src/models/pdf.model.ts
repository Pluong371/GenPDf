export interface VsicInfo {
  Name: string;
  NameEn: string;
  Code: string;
}

export interface CompanyProfile {
  GeneralInformationResponse: GeneralInformationResponse;
  OwnershipStructureResponse: OwnershipStructureResponse;
  CompanyProfileResponse: CompanyProfileResponse;
  CompanyImportExportResponse: CompanyImportExportResponse;
  IndustryDataModel: IndustryDataModel[];
  TopCompanyByNetRevenueModel: TopCompanyByNetRevenueModel[];
  FinancialReportResponse: FinancialReportResponse;
}

export interface Branches {
  CompanyId: string;
  TaxCode: string;
  Name: string;
  NameEn: string;
  Address: string;
}

export interface Ownership {
  name: string;
  amount: number;
  ownership: number;
  updateDate: string;
}

//chưa có
export interface CorporateHold {
  Name: string;
  Amount: number;
  Ownership: number;
  UpdateDate: string;
}

export interface OwnershipStructureCharts {
  OtherData: number;
  Label: string;
  EnLabel: string;
  Y: number;
}

export interface GeneralInformationResponse {
  CompanyId: string;
  CompanyEnName: string;
  CompanyName: string;
  VsicInfo: VsicInfo[];
  Address: string;
  PhoneNumber: string;
  Email: string;
  Fax: string;
  WebSite: string;
  RegistrationCode: string;
  IncorporatedDate: string;
  LegalForm: string;
  OperationStatus: boolean;
  BusinessSize: string;
  RepresentativeName: string;
  Nationality: string;
  DOB: string;
  IdPerson: string;
  Rank: string;

  CharterCapital: string;
  NoOfEmployee: number;
  LatestUpdate: string;
  NetRevenue: number;
}

export interface Subsidiaries {
  CompanyId: string;
  TaxCode: string;
  Name: string;
  NameEn: string;
  Ownership: number;
  VsicInfo: string;
  VsicEnInfo: string;
  CompanyLinkStatus: string;
  CompanyLinkStatusId: number;
}
export interface Affiliates {
  CompanyId: string;
  TaxCode: string;
  Name: string;
  NameEn: string;
  Ownership: number;
  VsicInfo: string;
  VsicEnInfo: string;
}

export interface OwnershipStructureResponse {
  CorporateHold: CorporateHold[];
  PrivateHold: Ownership[];
  //chưa có
  ForeignHold: Ownership[];

  OwnershipStructureCharts: OwnershipStructureCharts[];
}
export interface CompanyProfileResponse {
  Branches: Branches[];
  Subsidiaries: Subsidiaries[];
  Affiliates: Affiliates[];
}
export interface DataChart {
  OtherData: number;
  Label: string;
  EnLabel: string;
  Y: number;
}
export interface ChartModels {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface ImportAndExportData {
  Title: string;
  EnTitle: string;
  ChartModels: ChartModels[];
}
export interface ImportShareWeightRatioData {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface ExportShareWeightRatioData {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}

export interface CompanyImportExportResponse {
  ImportAndExportData: ImportAndExportData;
  ImportShareWeightRatioData: ImportShareWeightRatioData;
  ExportShareWeightRatioData: ExportShareWeightRatioData;
}
export interface TopCompanyByNetRevenueModel {
  companyId: string;
  companyName: string;
  companyEnName: string;
  netRevenue: string;
  netIncome: string;
  roa: number;
  roe: number;
  liability: number;
}
export interface IndustryValues {
  Years: string;
  Value: number;
}
export interface IndustryDataModel {
  Title: string;
  EnTitle: string;
  Cagr: number;
  IndustryValues: IndustryValues[];
}

export interface ListIncomeStatement {
  Title: string;
  EnTitle: string;
  Code: string;
  Level: string;
  ListValues: Value[];
}
export interface CashFlowStatement {
  //chưa có
  ListDirectMethod: string;
  ListIndirectMethod: ListIndirectMethod[][];
}
export interface ListIndirectMethod {
  Title: string;
  EnTitle: string;
  Code: string;
  Level: string;
  ListValues: Value[];
}
export interface FinancialReportResponse {
  Set: number;
  ListBalanceSheet: ListBalanceSheet[][];
  ListIncomeStatement: ListIncomeStatement[][];
  CashFlowStatement: CashFlowStatement;
  FinancialHighlight: FinancialHighlight;
  FinancialAnalysis: FinancialAnalysis;
}
export interface ListBalanceSheet {
  Title: string;
  EnTitle: string;
  Code: string;
  Level: string;
  ListValues: Value[];
}
export interface Value {
  Name: string;
  NameEn: string;
  Value: number;
}
export interface FinancialAnalysis {
  FinancialHealthRatios: FinancialHealthRatios[];
  ManagementEfficiencyRatios: ManagementEfficiencyRatios[];
  ProfitabilityRatios: ProfitabilityRatios[];
  GrowthRatios: GrowthRatios[];
}
export interface GrowthRatios {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface FinancialHealthRatios {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface ManagementEfficiencyRatios {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface ProfitabilityRatios {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface FinancialHighlight {
  ContributedCapital: number;
  NetRevenue: number;
  NetProfit: number;
  TotalAssets: number;
  OwnerEquity: number;
  ROE: number;
  ROA: number;
  UpdatePeriod: string;
  CompanyPerformanceReview: CompanyPerformanceReview[];
  AssetBreakdown: AssetBreakdown[];
  ExpenseBreakdown: ExpenseBreakdown[];
}
export interface ExpenseBreakdown {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface AssetBreakdown {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
export interface CompanyPerformanceReview {
  DataChart: DataChart[];
  Title: string;
  EnTitle: string;
  ChartType: string;
}
