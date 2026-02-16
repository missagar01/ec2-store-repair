// src/routes/grnAndpo.routes.js
import { Router } from "express";
import { getSummary } from "../controllers/grnAndpo.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/summary", authenticate, getSummary);

export default router;
