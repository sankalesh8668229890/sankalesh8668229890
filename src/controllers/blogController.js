const moment = require('moment')
const BlogModel = require('../models/Blogmodel')


const createBlog = async function (req, res) {  // created by jitendra

    let data = req.body;
    let condition = await authorModel.findById(req.body.author_id)
    if (condition) {
        if (req.body.isPublished == true) {
            data.publishedAt = Date.now()
            console.log(data)
        }
        let newdata = data
        console.log(req.body)
        let savedData = await blogModel.create(newdata)
        res.status(201).send({ savedData })
    } else {
        res.status(400).send("authorId is not present")
    }
}
    // const createBlog = async function(req,res){
    //     try{
    //     const {...data} = req.body
    //     console.log(data)
    //     const getData = await BlogModel.create(data)
    //     res.status(201).send({data:getData})
    // }catch(error){
    //     res.status(500).send(error)
    // }}

    const getBlog = async function (req, res) {  //created by D
        let { ...data } = req.query
        //console.log("which data" + data.title )

        let getData = await BlogModel.find({ isDeleted: false, isPublished: true, $or: [{ authorId: data.authorId }, { tags: data.tags }, { category: data.category }] })
        if (getData.length === 0) {
            res.status(404).send({ status: false, error: "Page not found" })
        }

        res.status(200).send({ data: getData })


    }


    const updateBlog = async function (req, res) { // created by D
        let getId = req.params.blogId  //grab userid from params
        let data = req.body  // data to be updated
        if (data?.isPublished === true) { //if user want to publish 
            data.publishedAt = Date.now()
        }
        if (data.isDeleted === true) { // if user want to delete
            data.isDeletedAt = Date.now()
        }
        let check = await BlogModel.findByIdAndUpdate(getId, data, { new: true })
        res.status(200).send({ status: true, msg: check })
    }


    module.exports = { createBlog, getBlog, updateBlog }