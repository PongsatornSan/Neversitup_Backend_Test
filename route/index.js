const router = require('express').Router();

router.use("/api", require("./api/auth"));
router.use("/api", require("./api/profile"));
router.use("/api", require("./api/product"));
router.use("/api", require("./api/order"));

module.exports = router;