const { Router } = require("express");
const Record = require("../models/record");
const { check, validationResult } = require("express-validator");
const router = Router();

// /api/record/get
router.get("/get", async (req, res) => {
  try {
    const records = await Record.find();
    return res.json({ records });
  } catch (e) {
    return res.status(500).json({
      message: "Error: " + e.message,
    });
  }
});

// /api/record/create
router.post(
  "/create",
  [
    check("username", "Username is empty").notEmpty(),
    check("score", "Score is empty").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data was entered when creating the event",
        });
      }

      const { username, score } = req.body;
      const record = new Record({ username: username, score: score });
      await record.save();
      return res.json();
    } catch (e) {
      return res.status(500).json({
        message: "Error: " + e.message,
      });
    }
  }
);

module.exports = router;
