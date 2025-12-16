import express from "express";
import poolDropdown from "../config/db_dropdown.js";

const router = express.Router();

router.get("/form-options", async (req, res) => {
  try {
    const machines = await poolDropdown.query(
      `SELECT DISTINCT machine_name FROM form_responses ORDER BY machine_name ASC`
    );

    const serials = await poolDropdown.query(
      `SELECT DISTINCT serial_no, machine_name FROM form_responses ORDER BY serial_no ASC`
    );

    const doerNames = await poolDropdown.query(
      `SELECT DISTINCT doer_name FROM master WHERE doer_name IS NOT NULL AND doer_name <> ''`
    );

    const departments = await poolDropdown.query(
      `SELECT DISTINCT department FROM master WHERE department IS NOT NULL AND department <> ''`
    );

    const givenBy = await poolDropdown.query(
      `SELECT DISTINCT given_by FROM master WHERE given_by IS NOT NULL AND given_by <> ''`
    );

    const priority = await poolDropdown.query(
      `SELECT DISTINCT priority FROM master WHERE priority IS NOT NULL AND priority <> ''`
    );

    res.json({
      success: true,
      machines: machines.rows.map((r) => r.machine_name),
      serials: serials.rows,
      doerNames: doerNames.rows.map((r) => r.doer_name),
      departments: departments.rows.map((r) => r.department),
      givenBy: givenBy.rows.map((r) => r.given_by),
      priority: priority.rows.map((r) => r.priority),
    });
  } catch (err) {
    console.error("❌ Error loading form options:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
