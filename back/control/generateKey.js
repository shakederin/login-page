const speakeasy = require("speakeasy");

exports.generateKey = () =>{
    const secret = speakeasy.generateSecret().base32    
    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
    return token;
}