const authormodel = require("../models/authormodel");
const bcrypt = require("bcryptjs");

let createauthor = async function (req, res) {
  try {
    let data = req.body;
    let email = req.body.email;
    let password = req.body.password;
    data.password = await bcrypt.hash(password, 10);
    console.log(data)

    let duplicate = await authormodel.findOne({ email: email });
    if (duplicate) {
      return res
        .status(400)
        .send({ status: false, msg: "EMAIL ALREADY EXISTS" });
    }

    let save = await authormodel.create(data);
    res.status(200).send({ msg: save });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { createauthor };
