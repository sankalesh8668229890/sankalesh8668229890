
const authorModel = require("../models/collegeModel");
const blogModel = require("../models/internModel")
//######################################################################################################################
let keyValid = function (value) {
    if (typeof (value) == "undefined") return true
    if (typeof (value) === "string" && value.trim().length == 0) return true
    return false
}

//######################################################################################################################
let createIntern = async (req, res) => {
    try {
        data = req.body
        const { fname, lname, title, email, password } = data
        
        if (!fname) return res.status(400).send({ status: false, msg: "fname is required...." });
        if (keyValid(fname)) return res.status(400).send({ status: false, msg: "fname should be valid" })

        if (!lname) return res.status(400).send({ status: false, msg: "lname is required...." });
        if (keyValid(lname)) return res.status(400).send({ status: false, msg: "lname should be valid" })

        if (!title) return res.status(400).send({ status: false, msg: "title is required...." });
        if (keyValid(title)) return res.status(400).send({ status: false, msg: "title should be valid" })

        if (!email) return res.status(400).send({ status: false, msg: "email is required...." });
        if (keyValid(email)) return res.status(400).send({ status: false, msg: "email should be valid" })
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, msg: "Invalid email format" })
        
        if (!password) return res.status(400).send({ status: false, msg: "password is required....." });
        if (keyValid(password)) return res.status(400).send({ status: false, msg: "password should be valid" })

        const validEmail = await authorModel.findOne({ email: email })
        if (validEmail) return res.status(400).send({ status: false, msg: "Email already exist" })

        const createdAuthor = await authorModel.create(data)
        return res.status(201).send({ status: true, data: createdAuthor })
    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//######################################################################################################################
const getblog = async (req, res) => {
    try {
        const data = req.query
        const blogs = {}
        const { authorId, category, tags, subcategory } = data

        if (authorId != undefined) {
            if (keyValid(authorId)) return res.status(400).send({ status: false, msg: "AuthorId is invalid" })
            const validId = await authorModel.findById(authorId)
            if (!validId) return res.status(400).send({ status: false, msg: "Not a valid AuthorId" })
            blogs.authorId = authorId
        }
        if (category != undefined) {
            if (keyValid(category)) return res.status(400).send({ status: false, msg: "Category is invalid" })
            blogs.category = category
        }
        if (tags != undefined) {
            if (keyValid(tags)) return res.status(400).send({ status: false, msg: "tags is invalid" })
            blogs.tags = tags
        }
        if (subcategory != undefined) {
            if (keyValid(subcategory)) return res.status(400).send({ status: false, msg: "Subcategory is invalid" })
            blogs.subcategory = subcategory
        }
        blogs.isDeleted = false
        blogs.isPublished = true
        let result = await blogModel.find(blogs)
        console.log(blogs)
        if (result.length == 0) return res.status(400).send({ status: false, msg: "No blog found" })
        return res.status(200).send({ status: true, data: result })

    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//######################################################################################################################

module.exports = { createBlog, getblog, deleteBlogs, updateBlog, deleteBlog }



