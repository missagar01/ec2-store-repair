import express from "express";
import {
  getPendingPayments,
  getPaymentHistory,
  addPayment
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/pending", getPendingPayments);
router.get("/history", getPaymentHistory);
router.post("/add", addPayment);

export default router;
