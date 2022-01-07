const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async (password) =>{
    const hashedText = await bcrypt.hash(password, saltRounds)
    return hashedText
}

exports.verifyPassword = async (password, hashed) =>{
    const match = await bcrypt.compare(password, hashed);
    return match
}
