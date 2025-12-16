import express from "express";
import {
  fetchAllTasks,
  fetchPendingTasks,
  fetchHistoryTasks,
  updateTaskDetails,
} from "../controllers/sentToVendorController.js";
import upload from "../middlewares/s3Upload.js";  // ✅ ADD THIS

const router = express.Router();

router.get("/all", fetchAllTasks);
router.get("/pending", fetchPendingTasks);
router.get("/history", fetchHistoryTasks);

// Update task data
// router.put("/update/:taskNo", updateTaskDetails);
router.put("/update/:taskNo", upload.single("transportingImage"), updateTaskDetails);

export default router;
