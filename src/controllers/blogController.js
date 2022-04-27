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
        let data = req.query
        console.log(data);
        
        
        let getData = await BlogModel.find({$and : [{isDeleted: false}, {isPublished: true},data]})
           console.log(getData);
        // { $or: [{ authorId: data.authorId }, { tags: data.tags }, { category: data.category },{subcategory : data.subcategory}] })
        if (getData == 0) {
            return res.status(404).send({ status: false, error: "Page not found" })
        }

        res.status(200).send({ status : true , data: getData })


    }

//3rd update data api
    const updateBlog = async function (req, res) {
    try{ // created by D
        let getId = req.params.blogId
        
        //if(getId== undefined)return res.status(400).send({staus : false,msg : "Kindly add Author Id"})  //grab userid from params
        
        let data = req.body  // data to be updated
        let checkId = await BlogModel.findById(getId)
        console.log(checkId);
        if(checkId){


            if (data?.isPublished === true) { //if user want to publish 
                data.publishedAt = Date.now()
            }
            if (data?.isDeleted === true) { // if user wantt to delete
                data.deletedAt = Date.now()
            }

            let check = await BlogModel.findByIdAndUpdate(getId, {$push :{tags:data.tags,subcategory : data.subcategory},title:data.title,body:data.body,category:data.category}, { new: true })
            res.status(200).send({ status: true, msg: check })
        }
        else{
            res.status(401).send({status : false, msg: "Please enter valid Blog id"})
        }
        
        
        
    }catch(error){
        console.log(error.message)
        res.status(500).send(error.message)
    } 
    }


    //delete 
    const deleteBlog = async function(req,res){
        let blogId = req.params.blogId
        
        if(!blogId){return res.status(404).send("KINDLY ADD BLOG ID")}
        let blog = await BlogModel.findById(blogId)
       
       if(!blog){return res.status(404).send("NOT A VALID BLOG ID")}
       if (blog.isDeleted==false){
           let save = await BlogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true,deletedAt:Date.now()}},{new:true})
           
           return res.status(200).send({msg:save})
    }else{
        res.status(404).send({status:false,msg:"already deleted"})
    }
}
    module.exports = { createBlog, getBlog, updateBlog,deleteBlog }