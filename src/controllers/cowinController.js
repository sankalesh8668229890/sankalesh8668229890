let axios = require("axios");
const { response } = require("express");


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
// problem:1
let vaccineByDistricId = async function(req,res){

try {
    let Id = req.query.district_id
    let date = req.query.date 
    let options = {
        method : "GET",
        url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${Id}&date=${date}`,
      }

    let result = await axios(options);
      let vaccineData = result.data;
      res.status(200).send({msg:vaccineData});
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}
// quetion 2
let weatherofCity = async function(req,res){

try {
    let place = req.query.q;
    let appId = req.query.appId;
    // console.log(place,appId)
    let options = {
        method : "get",
        url : `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${appId}`
    }
    let result = await axios(options);
    // let weatherReport = result.data;
    res.status(200).send({data:result.data})
    }
    catch(err){
        res.status(500).send({msg:err.essage})
    }
}

let getSortedPlaces = async function(req,res){
  
  try{
    let places = ["Bengaluru","Mumbai","Delhi","Kolkata","Chennai","London","Moscow"];
    let arrayOfPlaces = [];
    for (let i=0; i<places.length; i++){
        console.log(places[i])
        let obj = {place : places[i]}
        console.log(obj)
        let options = {
            method:"get",
            url:`http://api.openweathermap.org/data/2.5/weather?q=${places[i]}&appid=b5343e83a01bae805bfd29a3b9da3e2f`

        }
        console.log(options.url)
        let resp = await axios(options)
        // let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${places[i]}&appid=fb0380bd73b4a803400c0a2cadcc5bee`)
        // console.log(resp.data.main.temp)

        obj.temp = resp.data.main.temp
        arrayOfPlaces.push(obj)
    }

    let sorted = arrayOfPlaces.sort( function(a,b){ return a.temp - b.temp})
    console.log(sorted)
    res.status(200).send({status : true, data:sorted})
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}









module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.vaccineByDistricId = vaccineByDistricId
module.exports.weatherofCity = weatherofCity
module.exports.getSortedPlaces = getSortedPlaces





