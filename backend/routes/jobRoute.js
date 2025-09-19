import express from "express";
import { getJobs } from "../controller/jobController";

const router = express.Router();

// GET /api/temp/jobs
router.get("/jobs", getJobs);

export default router;
