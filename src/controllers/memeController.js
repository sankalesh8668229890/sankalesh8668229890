const axios = require ("axios");

let meme = async function(req,res){
   try{ 
    let result = await axios.get(`https://api.imgflip.com/get_memes`)
    console.log(result);
    res.status(200).send({status:true,data:result.data  })
   }
   catch(err){
       res.status(500).send({status:false,msg:err.message})
   }
}

let editedMeme = async function(req,res){
   try{
   
    let id = req.query.template_id;
    let Text0 = req.query.text0;
    let Text1 = req.query.text1;
    let Username = req.query.username;
    let Password  = req.query.password
    let {...memeData}=req.query
    console.log(memeData.username)

    let result = await axios.post(`https://api.imgflip.com/caption_image?template_id=${id}&text0=${Text0}&text1=${Text1}&username=${Username}&password=${Password}`)

    res.status(200).send({status:true,data:result.data.data})
   }
   catch(err){
       res.status(500).send({status:false,msg:err.message})
   }
}

module.exports.meme=meme
module.exports.editedMeme=editedMeme

