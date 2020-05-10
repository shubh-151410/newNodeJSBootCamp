const express = require('express');
const router = express.Router();

router.get("/",(req, res) => res.json({'question':'What is your name?'}));

module.exports = router;