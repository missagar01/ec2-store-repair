import express from "express";
import {
  fetchCheckTasks,
  fetchPendingCheck,
  fetchHistoryCheck,
  updateCheckTask
} from "../controllers/repairCheckController.js";

// ⭐ ADD THESE 2 LINES
import upload, { uploadToS3 } from "../middlewares/s3Upload.js";

const router = express.Router();

router.get("/all", fetchCheckTasks);
router.get("/pending", fetchPendingCheck);
router.get("/history", fetchHistoryCheck);

// ⭐ NEW ROUTE: Upload bill image to S3
router.post("/upload-bill", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const url = await uploadToS3(req.file);

    res.json({ success: true, url });
  } catch (err) {
    console.error("S3 Upload Error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// Material check update
router.put("/update/:taskNo", updateCheckTask);

export default router;
