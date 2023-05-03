const express = require("express");
const router = express.Router();
const order = require("../../controller/order.controller");
const { auth } = require("../../middleware/auth");

router.post("/addOrder", auth, order.addOrder);
router.get("/getOrder", auth, order.get);
router.delete("/delOrder", auth, order.del);

module.exports = router;