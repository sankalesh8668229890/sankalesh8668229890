const express = require('express');
const router = express.Router();
const developer = require('../controllers/developercontroller')
const Batches = require('../controllers/batchcontroller')



// const { route } = require('express/lib/application');


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post('/batches',Batches.batch)

router.post('/developer', developer.developer)

router.post('/eligibleDevelopers', developer.eligibleDevelopers)
 

module.exports = router;