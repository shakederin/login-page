const User = require("../mongoDB/userModel");
const sendMail = require("./emailMannage");
const { generateKey } = require("./generateKey");
const {verifyPassword} = require("./hash")
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


exports.secondDoor =(req, res) => {
const { token, username } = req.body;

for (const tokenOBJ of authCodes) {
    if (tokenOBJ.username === username) {
        if (tokenOBJ.token === token) {
            // redirect to other server
            const key = nanoid()
            DBKeys.push(key)
            console.log(key);
            res.cookie("access", key);
            res.send("you may enter");
            return;
        } else {
            res.send("wrong token");
            return;
        }
    }
}
res.send("wrong/invalid token");
}

