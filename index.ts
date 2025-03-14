import express from "express";
import router from "./src/routes/api";
import { ensureOutputDirExists } from "./src/utils/ensure-output-dir";


ensureOutputDirExists();

const app = express();
app.use(express.json({ limit: "10mb" }));  
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});