const express = require("express");
const membersService = require("../services/membersService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await membersService.getAllMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const member = await membersService.getMember(req.params.id);
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const status = await membersService.createMember(req.body);
    res.status(201).send(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const status = await membersService.updateMember(req.params.id, req.body);
    res.send(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const status = await membersService.deleteMember(req.params.id);
    res.send(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
