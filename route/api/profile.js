const express = require("express");
const router = express.Router();
const profile = require("../../controller/profile.controller");
const { auth } = require("../../middleware/auth");

router.get("/profile", auth, profile.get);

module.exports = router;