import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { generatePDF } from '../services/pdf-generator';
import type { CompanyProfile } from '../models/pdf.model';
// Thêm logger nếu bạn có
// import logger from '../utils/logger';

export const generatePdf = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data);
    
        if (!data) {
     
            console.error('PDF generation error: No data provided');
   
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid request data' 
            });
        }
        
      
        const companyProfile: CompanyProfile = data;
        
        const fileName = await generatePDF(companyProfile);
        
       
        const filePath = path.resolve(`./output/${fileName}`);
        
       
        if (!fs.existsSync(filePath)) {
           
            console.error('PDF generation error: File not created');
        
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to generate document' 
            });
        }
        
     
        res.download(filePath, fileName, (err) => {
            if (err) {
              
                console.error('Error sending file:', err);
                
            }
            
           
            // fs.unlinkSync(filePath);
        });
    } catch (error) {
       
        console.error('Error in PDF generation:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while processing your request' 
        });
    }
};