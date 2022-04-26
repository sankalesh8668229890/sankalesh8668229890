const express = require('express');
const router = express.Router();
let authorcontroller = require('../controllers/allcontroller')
router.post('/authors',authorcontroller.createauthor)
module.exports = router;