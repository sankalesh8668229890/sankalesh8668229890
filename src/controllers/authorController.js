const authorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await authorModel.create(author)
    console.log(author);
    res.send({data: authorCreated})
}

module.exports.createAuthor= createAuthor
