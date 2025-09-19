const axios = require("axios");

const CONTROL_M_API = "https://sagittarius.ortom8.com:8443/automation-api/run/jobs/status";

const getJobs = async (req, res) => {
  try {
    const { limit = 100, orderDateFrom, orderDateTo } = req.query;

    const params = {
      limit,
      ...(orderDateFrom && { orderDateFrom }),
      ...(orderDateTo && { orderDateTo })
    };

    const response = await axios.get(CONTROL_M_API, {
      headers: {
        "x-api-key": "b25QcmVtOjNkMGY3YjdiLThkMjMtNDVkMy1iZTM1LTg5ZDllZDdiZTU1MA==",
        "accept": "application/json"
      },
      params
    });

    console.log("[TempJobController] Response Status:", response.status);
    res.json(response.data);

  } catch (error) {
    console.error("[TempJobController] Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getJobs };