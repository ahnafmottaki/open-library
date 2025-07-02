const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();
router.post("/api/jwt", authControllers.postSetCookie);

module.exports = router;
