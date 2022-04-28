let authorModel = require("../models/authormodel");
let BlogModel = require("../models/Blogmodel");
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId)


const createBlog = async function (req, res) {
    try {
        let data = req.body;
        if (!isValidObjectId(data.authorId)) { return res.send("NOT A VALID AUTHOR ID") }
        let condition = await authorModel.findById(data.authorId);
        if (condition) {
            if (data.isPublished == true) {
                data.publishedAt = Date.now();
                let savedData = await BlogModel.create(data);

                res.status(201).send({ status: true, msg: savedData });
            } else {
                let savedData = await BlogModel.create(data);
                res.status(201).send({ status: true, msg: savedData });
            }
        } else {
            res.status(400).send({ status: false, msg: "authorId is not present" });
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

const getBlog = async function (req, res) {
    try {

     
        let getData = await BlogModel.find({
            $and: [{ isDeleted: false }, { isPublished: true }, data],
        }).populate("authorId");

        if (getData.length === 0) {
            return res.status(400).send({
                status: false,
                error: "Page not found",
                msg: "EITHER DELETED OR NOT PUBLISHED",
            });
        }

        res.status(200).send({ status: true, data: getData });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

//3rd update data api
const updateBlog = async function (req, res) {
    try {
        // created by D
        let getId = req.params.blogId;
        let data = req.body; // data to be updated
        let checkId = await BlogModel.findById(getId);
        if (checkId) {
            if (checkId.isDeleted === false) {
                let check = await BlogModel.findByIdAndUpdate(
                    getId,
                    {
                        $push: { tags: data.tags, subcategory: data.subcategory },
                        title: data.title,
                        body: data.body,
                        category: data.category,
                        isPublished: true,
                        publishedAt: Date.now(),
                    },
                    { new: true }
                );
                res.status(200).send({ status: true, msg: check });
            } else {
                res
                    .status(400)
                    .send({ status: false, msg: "CANT UPDATE , IT IS DELETED" });
            }
        } else {
            res
                .status(400)
                .send({ status: false, msg: "Please enter valid Blog id" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//delete
const deleteBlog = async function (req, res) {
    try {
       let blogId=req.params.blogId
      if (!blogId) {
            return res.status(404).send("KINDLY ADD BLOG ID");
        }
        let blog = await BlogModel.findById(blogId);

        if (!blog) {
            return res.status(404).send("NOT A VALID BLOG ID");
        }
        if (blog.isDeleted == false) {
            let save = await BlogModel.findOneAndUpdate(
                { _id: blogId },
                { $set: { isDeleted: true, deletedAt: Date.now() } },
                { new: true }
            );

            return res.status(200).send({ msg: save });
        } else {
            res.status(404).send({ status: false, msg: "already deleted" });
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

const deletebyquery = async function (req, res) {
    try {
        
        let find = await BlogModel.findOne(data);
        if (!find) {
            return res
                .status(404)
                .send({ status: false, msg: "Blog is not created" });
        }
        if (find.isDeleted == true) {
            return res
                .status(400)
                .send({ status: false, msg: "THIS DOCUMENT Is deleted" });
        }
        let saved = await BlogModel.updateMany(data,
            { $set: { isDeleted: true, deletedAt: Date.now() } }

        );
        res.status(200).send({ status: true, msg: "Blog is deleted" });
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
};
module.exports = { createBlog, getBlog, updateBlog, deleteBlog, deletebyquery };

/*line 51 : findone = findById
    line no 18 : else if ki jagaha else
    line no 55: new added ==> isPublished:true,publishedAt:Date.now()
    line 127 : findone ==>findMany
*/
