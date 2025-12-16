import { Router } from "express";
import {
  submitIndent,
  updateIndentDecision,
  listIndents,
  listAllIndents,
  getIndent,
  filterIndents,
  listIndentsByStatus, // Import the new combined function
} from "../controllers/indent.controller.js";

const router = Router();

router.get("/", listIndents);
router.get("/all", listAllIndents);
router.get("/filter", filterIndents);
router.get("/status/:statusType", listIndentsByStatus); // New dynamic route
router.post("/", submitIndent);
// PUT route must come before GET /:requestNumber to avoid route conflicts
router.put("/:requestNumber/status", updateIndentDecision);
router.get("/:requestNumber", getIndent);

export default router;
