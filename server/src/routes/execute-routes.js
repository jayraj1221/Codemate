const express = require("express");

const executeController = require("../controllers/execute-controller");

const router = express.Router();

router.post("/execute",[], executeController.executeCode);

module.exports = router;