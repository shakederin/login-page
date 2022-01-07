var jwt = require("jsonwebtoken");

exports.createToken = (userName) =>{
    const token = jwt.sign({token: userName}, process.env.TOKENSECRET , { expiresIn: "1h" })
    return token
}

exports.verifyToken = (token) =>{
    try {
        const decoded = jwt.verify(token, process.env.TOKENSECRET);
        console.log({valid: true, username: decoded.token});
        return {valid: true, message: decoded.token};
      } catch(err) {
          console.log({valid: false, message:err.message});
          return {valid: false, message:err.message};
      }
}
