const express = require("express");
const cors = require("cors");
const { firstDoor, secondDoor } = require("./control/login");
const { addUser, deleteUser } = require("./control/Users");
const { ErrorHandler } = require("./middlewares/errorHandler");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors({credentials: true, origin: 'http://'}));
app.use(express.json());

app.post("/login", firstDoor);
app.post("/verify", secondDoor);
app.post("/adduser", addUser);
app.post("/deleteuser", deleteUser);
app.use(ErrorHandler);

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
})