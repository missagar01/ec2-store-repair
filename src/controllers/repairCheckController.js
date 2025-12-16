// controllers/repairCheckController.js
import {
  getAllCheckTasks,
  getPendingCheckTasks,
  getHistoryCheckTasks,
  updateMaterialCheck
} from "../services/repairCheckServices.js";

export const fetchCheckTasks = async (req, res) => {
  try {
    const data = await getAllCheckTasks();
    res.json({ success: true, tasks: data });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false });
  }
};

export const fetchPendingCheck = async (req, res) => {
  try {
    const data = await getPendingCheckTasks();
    res.json({ success: true, tasks: data });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false });
  }
};

export const fetchHistoryCheck = async (req, res) => {
  try {
    const data = await getHistoryCheckTasks();
    res.json({ success: true, tasks: data });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false });
  }
};

export const updateCheckTask = async (req, res) => {
  try {
    const { taskNo } = req.params;
    const updated = await updateMaterialCheck(taskNo, req.body);

    res.json({
      success: true,
      message: "Check updated successfully",
      updated
    });
  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(500).json({ success: false });
  }
};
