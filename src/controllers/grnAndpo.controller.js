// src/controllers/grnAndpo.controller.js
import { getGrnAndPoSummary } from "../services/grnAndpo.service.js";

/**
 * Handles the request to get GRN and PO summary data.
 * Query params: fromDate (YYYY-MM-DD), toDate (YYYY-MM-DD)
 */
export async function getSummary(req, res) {
  try {
    const { fromDate, toDate } = req.query;

    // Default to current date if not provided
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const parsedFromDate = fromDate ? new Date(fromDate) : now;
    parsedFromDate.setHours(0, 0, 0, 0);

    const parsedToDate = toDate ? new Date(toDate) : new Date();
    parsedToDate.setHours(23, 59, 59, 999);

    // Validate dates
    if (isNaN(parsedFromDate.getTime()) || isNaN(parsedToDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: "Invalid date format. Please use YYYY-MM-DD.",
      });
    }

    const rows = await getGrnAndPoSummary(parsedFromDate, parsedToDate);

    return res.json({
      success: true,
      data: rows,
      meta: {
        fromDate: parsedFromDate.toISOString(),
        toDate: parsedToDate.toISOString(),
        total: rows.length,
      },
    });
  } catch (error) {
    console.error("getSummary error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch GRN and PO summary",
    });
  }
}
