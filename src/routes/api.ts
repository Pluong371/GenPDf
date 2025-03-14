import express from "express";
import { generatePdf } from "../controller/pdf.controller";

const router = express.Router();

router.post("/generate-pdf", generatePdf as any);

export default router;
