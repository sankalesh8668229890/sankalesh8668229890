const express = require('express');
const router = express.Router();
let authorcontroller = require('../controllers/authorController');
const { create } = require('../models/authormodel');
const blogController = require('../controllers/blogController')


router.post('/authors',authorcontroller.createauthor)
router.post ('/createBlog',blogController.createBlog)
router.get ('/getBlog',blogController.getBlog)

router.put('/updateBlog/:blogId',blogController.updateBlog)


router.put('/deleteBlog/:blogId',blogController.deleteBlog)
router.put('/delete')



module.exports = router;


