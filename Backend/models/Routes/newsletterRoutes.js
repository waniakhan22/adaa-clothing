const express = require("express");
const Newsletter = require("../newsletter");
const { protect, adminOnly } = require("../../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        await existing.save();
        return res.status(200).json({ success: true, message: "Subscribed again successfully" });
      }
      return res.status(400).json({ success: false, message: "Email already subscribed" });
    }

    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to subscribe", error: error.message });
  }
});

// @route   GET /api/newsletter
// @desc    Get all subscribers (admin only)
// @access  Private/Admin
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort("-createdAt");
    res.status(200).json({ success: true, subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch subscribers", error: error.message });
  }
});

// @route   DELETE /api/newsletter/:id
// @desc    Delete subscriber (admin only)
// @access  Private/Admin
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const sub = await Newsletter.findByIdAndDelete(req.params.id);
    if (!sub) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }
    res.status(200).json({ success: true, message: "Subscriber deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete subscriber", error: error.message });
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });

    if (!existing) {
      return res.status(404).json({ success: false, message: "Email not subscribed" });
    }

    existing.subscribed = false;
    await existing.save();
    res.status(200).json({ success: true, message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to unsubscribe", error: error.message });
  }
});

module.exports = router;
