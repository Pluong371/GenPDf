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

 

  if (profile.GeneralInformationResponse.VsicInfo && typeof profile.GeneralInformationResponse.VsicInfo === 'object') {
    vsicInfoArray = Object.values(profile.GeneralInformationResponse.VsicInfo)
      .filter((value): value is { name: string; code: string; NameEn: string } =>
        !!value && typeof value === 'object' && 'NameEn' in value && typeof value.NameEn === 'string'
      )
      .map(value => value.NameEn);
  }
  console.log('VsicInfoArray:', vsicInfoArray);
  const document = {
    html: html,
    data: {
      companyId: profile.GeneralInformationResponse.companyId,
      companyEnName: profile.GeneralInformationResponse.companyEnName,
      companyName: profile.GeneralInformationResponse.companyName,
      address: profile.GeneralInformationResponse.address,
      phoneNumber: profile.GeneralInformationResponse.phoneNumber,
      email: profile.GeneralInformationResponse.email,
      fax: profile.GeneralInformationResponse.fax,
      VsicInfoArray: vsicInfoArray,
      webSite: profile.GeneralInformationResponse.webSite,
      registrationCode: profile.GeneralInformationResponse.registrationCode,
      incorporatedDate: profile.GeneralInformationResponse.incorporatedDate,
      legalForm: profile.GeneralInformationResponse.legalForm,
      operationStatus: profile.GeneralInformationResponse.operationStatus,
      businessSize: profile.GeneralInformationResponse.businessSize,
      representativeName: profile.GeneralInformationResponse.representativeName,
      charterCapital: profile.GeneralInformationResponse.charterCapital,
      noOfEmployee: profile.GeneralInformationResponse.noOfEmployee,
      latestUpdate: profile.GeneralInformationResponse.latestUpdate,
      netRevenue: profile.GeneralInformationResponse.netRevenue,
      ownershipChartUrl: generateChart(
        profile.OwnershipStructureResponse.OwnershipStructureCharts
      ),

      rank: 1,
      
    },
    path: `./output/${profile.GeneralInformationResponse.companyId}.pdf`,
    type: "pdf",
  }; console.log('VsicInfo type:', typeof profile.GeneralInformationResponse.VsicInfo.map((activity) => activity.NameEn));
  console.log('VsicInfo value:', JSON.stringify(profile.GeneralInformationResponse.VsicInfo.map((activity) => activity.NameEn)));
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

  const fileName = `${profile.GeneralInformationResponse.companyId}.pdf`;
  return fileName;
};
