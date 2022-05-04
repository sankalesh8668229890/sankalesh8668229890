const { findOne } = require("../models/collegeModel")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

let keyValid = function (value) {
    if (typeof (value) == "undefined") { return true }
    if (typeof (value) === "string" && value.trim().length == 0) { return true }
    return false
}

let createCollege = async (req, res) => {
    try {
        data = req.body
        const { name, fullName, logoLink, isDeleted } = data

        if (!name) return res.status(400).send({ status: false, msg: "name is required...." });
        if (keyValid(name)) return res.status(400).send({ status: false, msg: "name should be valid" })

        if (!fullName) return res.status(400).send({ status: false, msg: "fullName is required...." });
        if (keyValid(fullName)) return res.status(400).send({ status: false, msg: "fullName should be valid" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is required....." });
        if (keyValid(logoLink)) return res.status(400).send({ status: false, msg: "logoLink should be valid" })
        if (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(logoLink)) return res.status(400).send({ status: false, msg: "Invalid Url format" })

        const createdCollege = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: createdCollege })
    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

const getCollegeDetails = async function (req, res) {
    try {
        const queryParams = req.query
        const collegeName = queryParams.collegeName
        // const { name, fullName, logoLink } = queryParams
 
        const collegeDetails = await collegeModel.findOne({ name: collegeName })
        if (!collegeDetails) return res.status(404).send({ status: false, message: "Please Provide CollegeName" })
        const collegeID = collegeDetails._id
        const getInternsByCollegeID = await internModel.find({ collegeId: collegeID })
        const data = {
            name: collegeDetails.name,
            fullName: collegeDetails.fullName,
            logoLink: collegeDetails.logoLink,
            interns: getInternsByCollegeID
        }

        res.status(200).send({ status: true, data: data })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}


module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails
