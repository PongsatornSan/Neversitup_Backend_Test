const express = require("express");
const router = express.Router();
const product = require("../../controller/product.controller");
const { auth } = require("../../middleware/auth");

router.get("/product", auth, product.get);
router.get("/product/search", auth, product.search);

module.exports = router;