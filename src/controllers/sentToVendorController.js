import {
  getAllRepairTasks,
  getPendingRepairTasks,
  getHistoryRepairTasks,
  updateRepairTask,
} from "../services/sentToVendorServices.js";
import { uploadToS3 } from "../middlewares/s3Upload.js";  // ✅ ADD THIS

// -------------------------------------------
// GET ALL TASKS
// -------------------------------------------
export const fetchAllTasks = async (req, res) => {
  try {
    const tasks = await getAllRepairTasks();
    return res.json({ success: true, tasks });
  } catch (err) {
    console.log("❌ Fetch All Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------------------------------
// GET PENDING TASKS
// -------------------------------------------
export const fetchPendingTasks = async (req, res) => {
  try {
    const tasks = await getPendingRepairTasks();
    return res.json({ success: true, tasks });
  } catch (err) {
    console.log("❌ Pending Fetch Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------------------------------
// GET HISTORY TASKS
// -------------------------------------------
export const fetchHistoryTasks = async (req, res) => {
  try {
    const tasks = await getHistoryRepairTasks();
    return res.json({ success: true, tasks });
  } catch (err) {
    console.log("❌ History Fetch Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------------------------------
// UPDATE TASK (SEND MACHINE)
// -------------------------------------------
export const updateTaskDetails = async (req, res) => {
  try {
    const { taskNo } = req.params;

    let transportingImageUrl = "";

    // ⭐ If file exists → upload to S3
    if (req.file) {
      transportingImageUrl = await uploadToS3(req.file);
    }

    // Body fields
    const body = req.body;

    // ⭐ Inject S3 URL into body
    const payload = {
      ...body,
      transportingImageWithMachine: transportingImageUrl || body.transportingImageWithMachine || null,
    };

    const updated = await updateRepairTask(taskNo, payload);

    return res.json({
      success: true,
      message: "Task updated successfully",
      updated,
    });
  } catch (err) {
    console.log("❌ Update Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
