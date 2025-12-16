// Unified routes index
import { Router } from "express";
import authRoutes from "./auth.routes.js";

// Store routes
import storeIndentRoutes from "./storeIndent.routes.js";
import vendorRateUpdateRoutes from "./vendorRateUpdate.routes.js";
import threePartyApprovalRoutes from "./threePartyApproval.routes.js";
import poRoutes from "./po.routes.js";
import healthRoutes from "./health.routes.js";
import itemRoutes from "./item.routes.js";
import uomRoutes from "./uom.routes.js";
import costLocationRoutes from "./costLocation.routes.js";
import indentRoutes from "./indent.routes.js";
import stockRoutes from "./stockRoutes.js";

// Repair routes
import repairRoutes from "./repairRoutes.js";
import repairOptionsRoutes from "./repairOptionsRoutes.js";
import sentToVendorRoutes from "./sentToVendorRoutes.js";
import repairCheckRoutes from "./repairCheckRoutes.js";
import storeInRoutes from "./storeInRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import repairGatePassRoutes from "./repairGatePass.routes.js";

const router = Router();

// Authentication routes (unified login)
router.use("/auth", authRoutes);

router.use("/store-indent", storeIndentRoutes);
router.use("/indent", indentRoutes);
router.use("/vendor-rate-update", vendorRateUpdateRoutes);
router.use("/three-party-approval", threePartyApprovalRoutes);
router.use("/po", poRoutes);
router.use("/health", healthRoutes);
router.use("/items", itemRoutes);
router.use("/uom", uomRoutes);
router.use("/cost-location", costLocationRoutes);
router.use("/stock", stockRoutes);

// Repair Management routes
router.use("/repair", repairRoutes);
router.use("/repair-options", repairOptionsRoutes);
router.use("/repair-system", sentToVendorRoutes);
router.use("/repair-check", repairCheckRoutes);
router.use("/repair-gate-pass", repairGatePassRoutes);
router.use("/store-in", storeInRoutes);
router.use("/payment", paymentRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;








