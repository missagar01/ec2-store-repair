// routes/repairRoutes.js
import express from "express";
import upload from "../middlewares/s3Upload.js";
import { createRepairTask, getAllRepairTasks } from "../controllers/repairController.js";

const router = express.Router();

// POST: insert new repair
// router.post("/create", createRepairTask);
router.get("/all", getAllRepairTasks);
router.post("/create", upload.single("image"), createRepairTask);

export default router;
