// src/routes/grnAndpo.routes.js
import { Router } from "express";
import { getSummary } from "../controllers/grnAndpo.controller.js";

const router = Router();

router.get("/summary", getSummary);

export default router;
