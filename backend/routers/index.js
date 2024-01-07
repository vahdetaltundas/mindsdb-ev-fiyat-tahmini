const express = require("express");
const router = express.Router();

const predictRoute = require("./predict.js");
const authRoute = require("./auth.js");

router.use("/predict",predictRoute);
router.use("/auth",authRoute);


module.exports = router;