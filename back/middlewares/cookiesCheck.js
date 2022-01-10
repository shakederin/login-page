const { verifyToken } = require("../control/token");

exports.checkCookies = (req, res, next) =>{
    const {valid, message} = verifyToken(req.cookies.token);
    if(!valid){
        res.clearCookie("token");
        res.redirect("http://localhost:8080")
        return;
    }
    next()
}