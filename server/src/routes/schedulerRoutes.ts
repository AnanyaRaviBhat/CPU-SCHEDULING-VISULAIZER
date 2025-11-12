import express from "express";
import { scheduleProcesses } from "../controllers/schedulerController";

const router = express.Router();

router.post("/schedule", scheduleProcesses);

export default router;
