const User = require("../mongoDB/userModel");
const sendMail = require("./emailMannage");
const { generateKey } = require("./generateKey");
const {verifyPassword} = require("./hash");
const { createToken } = require("./token");
const authCodes = []

exports.firstDoor = async (req, res, next) => {
    const { username, password } = (req.body);
    if(!username || !password){
        next("Either username or password params are missing");
        return
    };
    try {
        const userObject = await User.find({username});  
        if (!(await verifyPassword(password, userObject[0].password))) {
            next("Either username or password params are invalid")
            return;
        };
        const key = generateKey();
        console.log(key);

        authCodes.push({ username, key }); 

        setTimeout(() => {                                    
            for (const code of authCodes) {
                if (code.username === username) {
                    const index = authCodes.indexOf(code);
                    if (index > -1) {
                        authCodes.splice(index, 1);
                    }
                }
            }
            console.log("removed");
        }, 60*1000);

        // sendMail(userObject[0].email, username, key);
        res.send("valide params");

    } catch (error) {
        next("Either username or password params are invalid")
        return;
    }  
}


exports.secondDoor =(req, res, next) => {
    const { key, username } = req.body;

    if(!key){
        next("Missing Key");
        return;
    }

    for (const codeOBJ of authCodes) {
        if (codeOBJ.username === username) {
            if (codeOBJ.key === key) {
                const token = createToken(username)
                // redirect to other server
                console.log(key);
                res.cookie("token", token);
                res.send("you may enter");
                return;
            } else {
                next("Incorrect Key");
                return;
            }
        }
    }
    next("Incorrect Key");
}

