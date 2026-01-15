import express from "express";
import {
    getUsers,
    patchStoreAccess
} from "../controllers/settings.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.patch("/users/:id/store-access", patchStoreAccess);

export default router;
