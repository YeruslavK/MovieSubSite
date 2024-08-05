const express = require("express");
const subsService = require("../services/subsService");

const router = express.Router();

// Get all subscriptions
router.get("/", async (req, res) => {
  try {
    const subs = await subsService.getAllSubs();
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single subscription by ID
router.get("/:id", async (req, res) => {
  try {
    const sub = await subsService.getSub(req.params.id);
    if (sub) {
      res.json(sub);
    } else {
      res.status(404).json({ error: "Subscription not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new subscription
router.post("/", async (req, res) => {
  try {
    console.log("Received subscription data:", req.body);

    const { memberId, movieId, date } = req.body;

    if (!memberId || !movieId || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const newSub = await subsService.addSub(req.body);
    res.status(201).json(newSub);
  } catch (error) {
    console.error("Error adding subscription:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update an existing subscription by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSub = await subsService.updateSub(req.params.id, req.body);
    if (updatedSub) {
      res.json(updatedSub);
    } else {
      res.status(404).json({ error: "Subscription not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a subscription by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSub = await subsService.deleteSub(req.params.id);
    if (deletedSub) {
      res.json({ message: "Subscription deleted" });
    } else {
      res.status(404).json({ error: "Subscription not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
