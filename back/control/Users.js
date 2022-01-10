const User = require("../mongoDB/userModel");
const  Mongoose  = require("mongoose");
const { hashPassword, verifyPassword } = require("./hash");
require('dotenv').config();


const connectionString = process.env.CONNECTIONSTRING;

Mongoose.connect(connectionString)
.then(()=>{console.log("DB connected")})
.catch((error)=>{'error connecting to MongoDB:', error.message});


exports.addUser = async (req, res, next)=>{
    const {username, password, email, adminPassword} = req.body;
    console.log({username, password, email, adminPassword});
    if(!adminPassword){
        next("couldn't add new user")
        return 
    }
    const adminObject = await User.find({admin: true});
    if(!(await verifyPassword(adminPassword, adminObject[0].password))){
        next("couldn't add new user")
        return 
    }

    const hashedPassword = await hashPassword(password)
    const newUser = {
        username,
        password: hashedPassword,
        email,
        admin: false
    }
    try {
        await User.insertMany(newUser);
        res.send("User add successfully")
    } catch (error) {
        console.log(error);
        next("couldn't add new user")
    }
}

exports.deleteUser = async (req, res, next)=>{
    const {username} = req.body;
    try {
        const response = await User.deleteOne({ username }); // returns {deletedCount: 1}
        if(response.deletedCount === 1){
            res.send("User deleted successfully")
            return
        }else{
            next("couldn't delete user")
        }
    } catch (error) {
        next("couldn't delete user")
    }
}


