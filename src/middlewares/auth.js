const jwt = require("jsonwebtoken");

const validateToken = function(req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    // console.log(token);

    
    
    // If a token is present then decode the token with verify function
    // verify takes two inputs:
    // Input 1 is the token to be decoded
    // Input 2 is the same secret with which the token was generated
    // Check the value of the decoded token yourself
    // let decodedToken = jwt.verify(token, "functionup-thorium");
    // if (!decodedToken) {
    //   return res.send({ status: false, msg: "token is invalid" });
    // }
    // next()

    try {
      let decodedToken = jwt.verify(token, "functionup-thorium")
      req["decodedtoken"]=decodedToken
      // console.log(req.params.userId==decodedToken.userId)
      let validUserId = req.params.userId
      let validToken = decodedToken.userId
      if (validUserId!=validToken){
        return res.send({status: false, msg:"authorization fail"})
      }
      
    }
    catch(error){return res.send({status:false, msg:error.message})}
    next();
};

module.exports.validateToken = validateToken