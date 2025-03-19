import path from "path";
import fs from "fs";
import pdf from "pdf-creator-node";
import type {
  CompanyProfile,
  IndustryDataModel,
  ListBalanceSheet,
  ListIncomeStatement,
  ListIndirectMethod,
} from "../models/pdf.model";
import {
  ChartOutlabeledPi2,
  ChartOutlabeledPie,
  ChartTwoColumn,
  ChartLine,
} from "../templates/chart-templates";
import Handlebars from "../utils/helper";
import {
  flattenAndProcess,
  processBalanceSheetItem,
  processIncomeStatementItem,
  processCashFlowStatement,
  processIndustryData,
  processBranches,
  processSubsidiaries,
  processAffiliates,
  processFinancialHealthRatios,
} from "../utils/utils";

export const generatePDF = async (profile: CompanyProfile): Promise<string> => {
  const templatePath = path.resolve(
    __dirname,
    "../templates/pdf-templates.html"
  );

  const html = fs.readFileSync(templatePath, "utf8");
  let vsicInfoArray: string[] = [];
  const template = Handlebars.compile(html);
  if (
    profile.GeneralInformationResponse.VsicInfo &&
    typeof profile.GeneralInformationResponse.VsicInfo === "object"
  ) {
    vsicInfoArray = Object.values(profile.GeneralInformationResponse.VsicInfo)
      .filter(
        (value): value is { Name: string; Code: string; NameEn: string } =>
          !!value &&
          typeof value === "object" &&
          "NameEn" in value &&
          typeof value.NameEn === "string"
      )
      .map((value) => value.NameEn);
  }
  const data = {
    companyId: profile.GeneralInformationResponse.CompanyId,
    companyEnName: profile.GeneralInformationResponse.CompanyEnName,
    companyName: profile.GeneralInformationResponse.CompanyName,
    address: profile.GeneralInformationResponse.Address,
    phoneNumber: profile.GeneralInformationResponse.PhoneNumber,
    email: profile.GeneralInformationResponse.Email,
    fax: profile.GeneralInformationResponse.Fax,
    VsicInfoArray: vsicInfoArray,
    webSite: profile.GeneralInformationResponse.WebSite,
    registrationCode: profile.GeneralInformationResponse.RegistrationCode,
    incorporatedDate: profile.GeneralInformationResponse.IncorporatedDate,
    legalForm: profile.GeneralInformationResponse.LegalForm,
    operationStatus: profile.GeneralInformationResponse.OperationStatus,
    businessSize: profile.GeneralInformationResponse.BusinessSize,
    representativeName: profile.GeneralInformationResponse.RepresentativeName,
    charterCapital: profile.GeneralInformationResponse.CharterCapital,
    noOfEmployee: profile.GeneralInformationResponse.NoOfEmployee,
    latestUpdate: profile.GeneralInformationResponse.LatestUpdate,
    netRevenue: profile.GeneralInformationResponse.NetRevenue,
    nationality: profile.GeneralInformationResponse.Nationality,
    DOB: profile.GeneralInformationResponse.DOB,
    IdPerson: profile.GeneralInformationResponse.IdPerson,
    ownershipChartUrl: ChartOutlabeledPie(
      profile.OwnershipStructureResponse.OwnershipStructureCharts
    ),

    TotalImportExportValue: ChartTwoColumn(
      profile.CompanyImportExportResponse.ImportAndExportData.ChartModels
    ),
    ImportChart: ChartOutlabeledPi2(
      profile.CompanyImportExportResponse.ImportAndExportData.ChartModels[0]
        ?.DataChart
    ),
    ExportChart: ChartOutlabeledPi2(
      profile.CompanyImportExportResponse.ImportAndExportData.ChartModels[1]
        ?.DataChart
    ),
    AssetBreakdownChart1: ChartOutlabeledPie(
      profile.FinancialReportResponse.FinancialHighlight.AssetBreakdown[0]
        ?.DataChart
    ),
    AssetBreakdownChart2: ChartOutlabeledPie(
      profile.FinancialReportResponse.FinancialHighlight.AssetBreakdown[1]
        ?.DataChart
    ),
    AssetBreakdownChart3: ChartOutlabeledPie(
      profile.FinancialReportResponse.FinancialHighlight.AssetBreakdown[2]
        ?.DataChart
    ),
    ExpenseBreakdownChart1: ChartOutlabeledPie(
      profile.FinancialReportResponse.FinancialHighlight.ExpenseBreakdown[0]
        ?.DataChart
    ),
    ExpenseBreakdownChart2: ChartOutlabeledPie(
      profile.FinancialReportResponse.FinancialHighlight.ExpenseBreakdown[1]
        ?.DataChart
    ),
    ExpenseBreakdownChart3: ChartOutlabeledPie(
      profile.FinancialReportResponse.FinancialHighlight.ExpenseBreakdown[2]
        ?.DataChart
    ),
    FinancialHealthRatios: profile.FinancialReportResponse.FinancialAnalysis.FinancialHealthRatios,
    FinancialHealthRatiosChart: ChartLine(profile.FinancialReportResponse.FinancialAnalysis.FinancialHealthRatios),
    corporateHold: profile.OwnershipStructureResponse.CorporateHold,
    privateHold: profile.OwnershipStructureResponse.PrivateHold,
    foreignHold: profile.OwnershipStructureResponse.ForeignHold,
    Branches: profile.CompanyProfileResponse.Branches,
    ListBalanceSheet: profile.FinancialReportResponse.ListBalanceSheet,
    ListIncomeStatement: profile.FinancialReportResponse.ListIncomeStatement,
    ListIndirectMethod:
      profile.FinancialReportResponse.CashFlowStatement.ListIndirectMethod,
    IndustryData: profile.IndustryDataModel,
    TopCompanyByNetRevenueModel: profile.TopCompanyByNetRevenueModel,
    rank: profile.GeneralInformationResponse.Rank,
    Subsidiaries: profile.CompanyProfileResponse.Subsidiaries,
    Affiliates: profile.CompanyProfileResponse.Affiliates,
  };

  // console.log("profile.Financđáqưe12312312312tatement",profile.FinancialReportResponse.CashFlowStatement.ListIndirectMethod);
  // console.log("data.ListIndirectMethod",profile.CompanyImportExportResponse.ImportAndExportData.ChartModels);
  if (data.Branches && Array.isArray(data.Branches)) {
    data.Branches = processBranches(data.Branches);
  }
  if (
    profile.FinancialReportResponse.ListBalanceSheet &&
    Array.isArray(profile.FinancialReportResponse.ListBalanceSheet)
  ) {
    data.ListBalanceSheet = flattenAndProcess<ListBalanceSheet, any>(
      profile.FinancialReportResponse.ListBalanceSheet,
      processBalanceSheetItem
    );
  }
  if (
    profile.FinancialReportResponse.ListIncomeStatement &&
    Array.isArray(profile.FinancialReportResponse.ListIncomeStatement)
  ) {
    data.ListIncomeStatement = flattenAndProcess<ListIncomeStatement, any>(
      profile.FinancialReportResponse.ListIncomeStatement,
      processIncomeStatementItem
    );
  }
  if (
    profile.FinancialReportResponse.CashFlowStatement &&
    profile.FinancialReportResponse.CashFlowStatement.ListIndirectMethod &&
    Array.isArray(
      profile.FinancialReportResponse.CashFlowStatement.ListIndirectMethod
    )
  ) {
    data.ListIndirectMethod = flattenAndProcess<ListIndirectMethod, any>(
      profile.FinancialReportResponse.CashFlowStatement.ListIndirectMethod,
      processCashFlowStatement
    );
  }
  if (profile.IndustryDataModel && Array.isArray(profile.IndustryDataModel)) {
    data.IndustryData = profile.IndustryDataModel.map(processIndustryData);
  }
  if (
    profile.FinancialReportResponse.FinancialAnalysis.FinancialHealthRatios &&
    Array.isArray(profile.FinancialReportResponse.FinancialAnalysis.FinancialHealthRatios)
  ) {
    data.FinancialHealthRatios =
      profile.FinancialReportResponse.FinancialAnalysis.FinancialHealthRatios.map(
        processFinancialHealthRatios
      );
  }
  if (
    profile.CompanyProfileResponse.Subsidiaries &&
    Array.isArray(profile.CompanyProfileResponse.Subsidiaries)
  ) {
    data.Subsidiaries = processSubsidiaries(
      profile.CompanyProfileResponse.Subsidiaries
    );
  }
  if (
    profile.CompanyProfileResponse.Affiliates &&
    Array.isArray(profile.CompanyProfileResponse.Affiliates)
  ) {
    data.Affiliates = processAffiliates(
      profile.CompanyProfileResponse.Affiliates
    );
  }

  const htmlTemplate = template(data);
  // console.log("VsicInfoArray:", vsicInfoArray);
  const document = {
    html: htmlTemplate,
    data: data,
    path: `./output/${profile.GeneralInformationResponse.CompanyId}.pdf`,
    type: "pdf",
  };
  // console.log('VsicInfoArray test:',profile.OwnershipStructureResponse.corporateHold);
  //  console.log('VsicInfo type:', typeof profile.generalInformation.VsicInfo.map((activity) => activity.NameEn));
  // console.log('VsicInfo value:', JSON.stringify(profile.generalInformation.VsicInfo.map((activity) => activity.NameEn)));
  const options = {
    format: "A4",
    border: "0mm",
    orientation: "portrait",
    header: {
      height: "10mm",
    },
    footer: {
      height: "10mm",
    },
    autoPaging: true,
  };

  await pdf.create(document, options);

  const fileName = `${profile.GeneralInformationResponse.CompanyId}.pdf`;
  return fileName;
};
