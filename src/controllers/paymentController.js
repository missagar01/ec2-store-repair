import {
  getPendingPaymentsService,
  getPaymentHistoryService,
  insertPaymentService
} from "../services/paymentServices.js";

// 🟡 GET pending
export const getPendingPayments = async (req, res) => {
  try {
    const tasks = await getPendingPaymentsService();
    res.json({ success: true, tasks });
  } catch (err) {
    console.error("Pending Error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch pending payments" });
  }
};

// 🟢 GET history
export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await getPaymentHistoryService();
    res.json({ success: true, payments });
  } catch (err) {
    console.error("History Error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch payment history" });
  }
};

// 🔵 POST add new payment
export const addPayment = async (req, res) => {
  try {
    const saved = await insertPaymentService(req.body);
    res.json({ success: true, payment: saved });
  } catch (err) {
    console.error("Insert Error:", err);
    res.status(500).json({ success: false, error: "Failed to add payment" });
  }
};
