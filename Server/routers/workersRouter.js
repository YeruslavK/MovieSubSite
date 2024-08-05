const express = require("express");
const workersService = require("../services/workersService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const worker = await workersService.getAllWorkers();
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const worker = await workersService.getWorker(req.params.id);
    if (worker) {
      res.json(worker);
    } else {
      res.status(404).json({ error: "Worker not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
