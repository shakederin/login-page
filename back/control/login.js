const User = require("../mongoDB/userModel");
const { generateKey } = require("./generateKey");
const authCodes = []

exports.firstDoor = async (req, res, next) => {
    const { username, password } = (req.body);
    if(!username || !password){
        next("missingRegistrationParams");
        return
    };
    const userObject = await User.find({username});

    if (userObject.username !== username) {
        next("Either username or password params are invalid")
        return;
    };
    if (userObject.password !== password) {
        next("Either username or password params are invalid")
        return;
    };

    const key = generateKey();
    console.log(key);

    authCodes.push({ username, key })                         
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

    
    //   sendMail(DB[username].email, username, key)
    res.end()
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

