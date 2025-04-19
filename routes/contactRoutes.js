const express = require("express");
const { submitContactForm } = require("../controllers/contactController");

const router = express.Router();

// Route: POST /api/contact
router.post("/contact", submitContactForm);

module.exports = router;
