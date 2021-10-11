const express = require("express");
const router = express.Router();
const {
  getErrors,
  addError,
  deleteError,
} = require("../controllers/ErrorsController");

router.post("/getallerrors", getErrors);
router.post("/adderror", addError);
router.post("/deleteerror", deleteError);

module.exports = router;
