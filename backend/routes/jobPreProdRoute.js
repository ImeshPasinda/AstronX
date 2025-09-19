const express = require("express");
const { getJobs } = require("../controller/jobPreProdController");

const router = express.Router();

router.get("/jobs", getJobs);

module.exports = router;