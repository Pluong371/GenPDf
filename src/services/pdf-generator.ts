import path from "path";
import fs from "fs";
import pdf from "pdf-creator-node";
import type { CompanyProfile } from "../models/pdf.model";
import { generateChart } from "../templates/chart-templates";

export const generatePDF = async (profile: CompanyProfile): Promise<string> => {
  const templatePath = path.resolve(
    __dirname,
    "../templates/pdf-templates.html"
  );

  const html = fs.readFileSync(templatePath, "utf8");
  let vsicInfoArray: string[] = [];

 

  if (profile.generalInformation.VsicInfo && typeof profile.generalInformation.VsicInfo === 'object') {
    vsicInfoArray = Object.values(profile.generalInformation.VsicInfo)
      .filter((value): value is { name: string; code: string; NameEn: string } =>
        !!value && typeof value === 'object' && 'NameEn' in value && typeof value.NameEn === 'string'
      )
      .map(value => value.NameEn);
  }
  console.log('VsicInfoArray:', vsicInfoArray);
  const document = {
    html: html,
    data: {
      companyId: profile.generalInformation.companyId,
      companyEnName: profile.generalInformation.companyEnName,
      companyName: profile.generalInformation.companyName,
      address: profile.generalInformation.address,
      phoneNumber: profile.generalInformation.phoneNumber,
      email: profile.generalInformation.email,
      fax: profile.generalInformation.fax,
      VsicInfoArray: vsicInfoArray,
      webSite: profile.generalInformation.webSite,
      registrationCode: profile.generalInformation.registrationCode,
      incorporatedDate: profile.generalInformation.incorporatedDate,
      legalForm: profile.generalInformation.legalForm,
      operationStatus: profile.generalInformation.operationStatus,
      businessSize: profile.generalInformation.businessSize,
      representativeName: profile.generalInformation.representativeName,
      charterCapital: profile.generalInformation.charterCapital,
      noOfEmployee: profile.generalInformation.noOfEmployee,
      latestUpdate: profile.generalInformation.latestUpdate,
      netRevenue: profile.generalInformation.netRevenue,
      ownershipChartUrl: generateChart(
        profile.ownershipStructure.ownershipStructureCharts
      )
      
    },
    path: `./output/${profile.generalInformation.companyId}.pdf`,
    type: "pdf",
  }; console.log('VsicInfo type:', typeof profile.generalInformation.VsicInfo.map((activity) => activity.NameEn));
  console.log('VsicInfo value:', JSON.stringify(profile.generalInformation.VsicInfo.map((activity) => activity.NameEn)));
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

  const fileName = `${profile.generalInformation.companyId}.pdf`;
  return fileName;
};
